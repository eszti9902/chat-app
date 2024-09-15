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


    const { currentUser } = useAuth()

    // listen on a document in real time
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "userchats", currentUser.uid), async (res) => {
            const chatsArr = res.data().chats
            const promises = chatsArr.map(async (chat) => {
                console.log(chat.receiverId)
                const userDocRef = doc(db, "users", chat.receiverId)
                const userDocSnap = await getDoc(userDocRef)

                const user = userDocSnap.data()
                return { ...chat, user }
            })

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a, b) => a.createdAt - b.createdAt))
        });
        return unsubscribe
    }, [currentUser.uid])

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

    return (
        <div className='flex-2'>
            <UserInfo />
            <div className='flex my-5 relative'>
                <div className='flex-grow flex bg-[#E5E5E5] items-center rounded-md'>
                    <IoMdSearch style={{ width: '25px', height: '25px' }} />
                    <input type='text' placeholder='Search' className='pl-2 w-4/5 bg-transparent text-[#1F1F1F] border-none outline-none' />
                </div>
                <button className='ml-2 bg-[#E5E5E5] rounded-md' type='button' onClick={handleAddUserMode}>{addMode ? <IoAdd style={{ width: '30px', height: '30px' }} /> : <FiMinus style={{ width: '30px', height: '30px' }} />}</button>
                {addUser && <AddUser />}
            </div>
            <div className='flex-1'>
                {chats.map(chat => (
                    <div key={chat.chatId} onClick={() => handleSelectChat(chat, chat.user)} className={`${chat?.isSeen ? 'bg-transparent text-black' : 'bg-[#D1007D] text-[#F0F0F0]'} ${isChatOpen && 'bg-transparent text-black'}`}>
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
                                {/* TODO */}
                                <p className='text-xs'>{`${chat.receiverId === chat.user.id ? 'You: ' : ""}` + chat.lastMessage}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
