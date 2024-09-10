'use client'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
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
        //firebases logikát kiszedni
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
        <div>
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type='submit'>Search</button>
            </form>
            {user && <div>
                <span>{user.username}</span>
                <button onClick={handleAdd}><IoPersonAdd /></button>
            </div>
            }
        </div>
    )
}
