'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Chatlist from './Chatlist'
import Loading from './Loading'
import Login from './Login'
import AddUser from './AddUser'
import Chats from './Chats'

export default function ChatPage() {
    const { currentUser, userDataObj, loading } = useAuth()
    const [data, setData] = useState({})
    const [isChatlistVisible, setIsChatlistVisible] = useState(false)

    useEffect(() => {
        if (!currentUser || !userDataObj) {
            return
        }
        setData(userDataObj)
    }, [currentUser, userDataObj])

    if (loading) {
        return <Loading />
    }
    if (!currentUser) {
        return <Login />
    }

    const toggleChatList = () => {
        setIsChatlistVisible((prev) => !prev)
    }
    // signOut(auth).then(() => console.log('im out'))
    // localStorage.clear();
    // sessionStorage.clear();
    return (
        <>
            <div className='flex px-4 sm:px-8 h-fit'>
                <div className={`${isChatlistVisible ? 'block' : 'hidden'} sm:block sm:w-1/3 overflow-y-auto flex-col`}>
                    <Chatlist />
                </div>
                <div className='flex-1 sm:w-2/3 overflow-y-auto flex-col'>
                    <button className='sm:hidden fixed bottom-4 left-4 p-3 rounded-full' onClick={toggleChatList}>{isChatlistVisible ? 'Close' : 'Open'}</button>
                    <Chats />
                </div>
            </div>
        </>
    )
}
