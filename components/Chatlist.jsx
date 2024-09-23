'use client'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import AddUser from './AddUser'
import UserInfo from './UserInfo'
import { IoMdSearch } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import Image from 'next/image'

export default function Chatlist(props) {
    const { onSelectChat } = props
    const [chats, setChats] = useState([])
    const [addUser, setAddUser] = useState(false)
    const [addMode, setAddMode] = useState(true)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [input, setInput] = useState("")

    const { currentUser } = useAuth()

    // listen on a document in real time
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "userchats", currentUser.uid), async (res) => {
            const chatsArr = res.data()?.chats || []; // Ha nincs chats adat
            console.log(chatsArr);
            const promises = chatsArr.map(async (chat) => {
                console.log(chat)
                // Ellenőrizzük, hogy az aktuális felhasználó a fogadó-e
                const isCurrentUserReceiver = chat.receiverId === currentUser.uid;
                const partnerId = isCurrentUserReceiver ? chat.senderId : chat.receiverId;

                // A beszélgető partner adatait töltjük le
                const userDocRef = doc(db, "users", partnerId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();

                return {
                    ...chat,
                    user, // A beszélgető partner adatai
                    isCurrentUserReceiver // Boolean, amely jelzi, hogy a currentUser a fogadó-e
                };
            });

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => a.createdAt - b.createdAt));
        });
        return () => unsubscribe();
    }, [currentUser.uid]);


    const handleAddUserMode = () => {
        setAddUser((prev) => !prev)
        setAddMode((prev) => !prev)
    }

    const handleSelectChat = async (chat, receiverUser) => {
        setIsChatOpen((prev) => !prev)
        const userChats = chats.map(chat => {
            const { user, ...rest } = chat
            return rest
        })
        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)
        userChats[chatIndex].isSeen = true

        const userChatsRef = doc(db, "userchats", currentUser.uid)
        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            })
        } catch (error) {
            console.log(error.message)
        }
        onSelectChat(chat.chatId, receiverUser)
    }
    console.log(chats[0])

    const filteredChats = chats.filter(chat => chat.user.username.toLowerCase().includes(input.toLowerCase()))

    return (
        < div className='flex-1' >
            <UserInfo />
            <div className='flex my-5 relative'>
                <div className='flex-grow flex bg-[#E5E5E5] items-center rounded-md'>
                    <IoMdSearch style={{ width: '25px', height: '25px' }} />
                    <input type='text' placeholder='Search' onChange={(e) => setInput(e.target.value)} className='pl-2 w-4/5 bg-transparent text-[#1F1F1F] border-none outline-none' />
                </div>
                <button className='ml-2 bg-[#E5E5E5] rounded-md' type='button' onClick={handleAddUserMode}>{addMode ? <IoAdd style={{ width: '30px', height: '30px' }} /> : <FiMinus style={{ width: '30px', height: '30px' }} />}</button>
                {addUser && <AddUser />}
            </div>
            <div className='flex-1'>
                {filteredChats.map(chat => (
                    <div key={chat.chatId} onClick={() => handleSelectChat(chat, chat.user)} className={`bg-transparent ${chat.isSeen ? 'text-black' : 'border-y-4 border-[#D1007D]'} ${isChatOpen && 'bg-transparent text-black'}`}>
                        <div className='flex items-center gap-5 border-b-2 py-2'>
                            <Image
                                src={chat.user.picture || "/default.jpg"}
                                alt="e"
                                width={50}
                                height={50}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                                <span>{chat.user.username}</span>
                                <p className='text-xs w-full overflow-auto'>{chat.lastMessage}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
