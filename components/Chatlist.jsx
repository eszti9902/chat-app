'use client'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import AddUser from './AddUser'

export default function Chatlist() {
    const [chats, setChats] = useState([])
    const [addUser, setAddUser] = useState(false)

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
    }

    return (
        <div>
            <button type='button' onClick={handleAddUserMode}>Add new user</button>
            {chats.map(chat => (
                <div key={chat.chatId}>
                    <div>
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addUser && <AddUser />}
        </div>
    )
}
