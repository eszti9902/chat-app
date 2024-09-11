'use client'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoPersonAdd } from "react-icons/io5";

export default function AddUser() {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")

    const { currentUser } = useAuth()
    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const userRef = collection(db, "users");

            // Search in users db based on condition
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q)
            if (!querySnapshot.empty) {
                setUser(querySnapshot.docs[0].data())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAdd = async () => {
        if (!currentUser || !currentUser.uid) {
            console.error('User is not authenticated');
            return;
        }
        if (!user || !user.id) {
            console.error('User to add is not selected or invalid');
            return;
        }
        try {
            const chatRef = collection(db, "chats");
            const userChatsRef = collection(db, "userchats");
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
                participants: [currentUser.uid, user.id]
            });

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.uid,
                    updatedAt: Date.now()
                })
            });

            await updateDoc(doc(userChatsRef, currentUser.uid), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now()
                })
            });

        } catch (error) {
            console.error('Error adding user:', error);
        }
    }



    return (
        //<div className='relative'>
        <div className='p-3 h-max w-max bg-[#D1007D] rounded inset-0 m-auto fixed items-center justify-center'>
            <form className='flex gap-2' onSubmit={handleSearch}>
                <input className='p-2 rounded border-none outline-none w-4/5' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className='p-2 rounded bg-[#D1007D] text-[#F0F0F0]' type='submit'>Search</button>
            </form>
            {user &&
                <div className='mt-2 flex items-center justify-between'>
                    <div className='flex items-center justify-between gap-5'>
                        <Image
                            src="/e.jpg"
                            alt="e"
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span className='text-[#F0F0F0]'>{user.username}</span>
                    </div>
                    <button className='p-2 text-[#F0F0F0]' onClick={handleAdd}><IoPersonAdd style={{ width: '22px', height: '22px' }} /></button>
                </div>
            }
        </div>
        //</div>
    )
}
