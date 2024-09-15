'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BsEmojiHeartEyes } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/context/AuthContext';
import { HiPhoto } from "react-icons/hi2";
import upload from '@/app/upload';

export default function Chats(props) {
    const { chatId, receiverUser } = props
    const [text, setText] = useState('')
    const [chat, setChat] = useState(null)
    const endRef = useRef(null)
    const [isEmojiOpen, setIsEmojiOpen] = useState(false)
    const [img, setImg] = useState({
        file: null,
        url: ""
    })
    const { currentUser } = useAuth()

    // scrolling to the end of messages
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat?.messages])

    useEffect(() => {
        if (!chatId) {
            return
        }
        const unsubscribe = onSnapshot(doc(db, "chats", chatId), async (res) => {
            setChat(res.data())
        })
        return unsubscribe
    }, [chatId])


    const handleOpenEmoji = () => {
        setIsEmojiOpen((prev) => !prev)
    }

    const handleEmoji = (e) => {
        console.log(e)
        setText((prev) => prev + e.emoji)
        setIsEmojiOpen(false)
    }

    const handleSendMessage = async () => {
        if (text === '' && !img.file) {
            return
        }

        let imgUrl = null

        try {
            if (img.file) {
                imgUrl = await upload(img.file)
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.uid,
                    text: text || '',
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl })
                })
            })
            const otherUserId = chat.participants.filter(id => id !== currentUser.uid)[0]
            console.log("otherUserId: " + otherUserId)
            const userIds = [currentUser.uid, otherUserId]

            userIds.forEach(async (id) => {
                const userChatRef = doc(db, "userchats", id)
                const userChatSnapshot = await getDoc(userChatRef)
                if (userChatSnapshot.exists()) {
                    const userChatsData = userChatSnapshot.data()
                    console.log(userChatsData)
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)
                    userChatsData.chats[chatIndex].lastMessage = img.url ? img.url : text
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.uid ? true : false
                    userChatsData.chats[chatIndex].updatedAt = Date.now()

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats
                    })
                }
            })
            setImg({
                file: null,
                url: ""
            })
            setText("")
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSetImage = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    return (
        <div className='flex flex-1 flex-col h-full'>
            <div id='top' className='pl-5 flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <Image
                        src={receiverUser?.picture || '/default.jpg'}
                        alt="e"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <h2 className='font-bold'>{receiverUser?.username}</h2>
                </div>
            </div>
            <div id='center' className='flex flex-col gap-5 p-5 flex-1 overflow-y-scroll'>
                {chat?.messages?.map(message => (
                    <div key={message?.createdAt} className={`max-w-[70%] flex gap-5 ${message.senderId === currentUser?.uid ? 'self-end' : 'self-start'}`}>
                        {message.senderId !== currentUser?.uid && <Image
                            src={receiverUser?.picture || '/default.jpg'}
                            alt="userphoto"
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%', objectFit: 'cover', width: '50px', height: '50px' }}
                        />}
                        <div id='texts' className='flex flex-1 flex-col gap-2'>
                            {message.img && <div className={`max-w-[70%] flex gap-5 ${message.senderId === currentUser?.uid ? 'self-end' : 'self-start'}`}>
                                <div id='texts' className='flex flex-1 flex-col gap-2'>
                                    <Image
                                        src={message.img}
                                        alt='photo'
                                        width={400}
                                        height={400}
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                            </div>}
                            {message.text && <p className={`p-3 rounded-lg ${message.senderId === currentUser.uid ? 'bg-[#FF8A5B]' : 'bg-[#FFE066]'}`}>{message.text}</p>}
                            {/* <span className='text-sm'>{message.createdAt}</span> */}
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div id='bottom' className='mt-auto bg-[#E5E5E5] flex gap-5 items-center p-5 justify-between'>
                {/* <div id='icons' className='flex gap-5'></div> */}
                <label htmlFor='sendPic'>
                    <HiPhoto style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </label>
                <input type='file' className='hidden' id='sendPic' onChange={handleSetImage} />
                <input className='flex-1 pl-2 w-4/5 bg-transparent text-[#1F1F1F] border-none outline-none' type='text' placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />
                <div id='emoji' className='relative'>
                    <BsEmojiHeartEyes onClick={handleOpenEmoji} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <div className='absolute bottom-5 right-0'>
                        <EmojiPicker open={isEmojiOpen} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button><FiSend style={{ width: '20px', height: '20px' }} onClick={handleSendMessage} /></button>
            </div>
        </div >
    )
}
