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
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [isChatlistVisible, setIsChatlistVisible] = useState(false)
    const [receiverUser, setReceiverUser] = useState(null)

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

    const handleSelectChat = (chatId, receiverUser) => {
        setSelectedChatId(chatId)
        setReceiverUser(receiverUser)
    }
    // signOut(auth).then(() => console.log('im out'))
    // localStorage.clear();
    // sessionStorage.clear();
    return (
        <div className='flex flex-1 px-0 sm:px-8 h-full block'>
            <div className={`${isChatlistVisible ? 'block' : 'hidden'} sm:block sm:w-1/5 w-1/2 h-full overflow-y-auto ${isChatlistVisible && 'mt-6 sm:mt-0'}`}>
                <Chatlist onSelectChat={handleSelectChat} />
            </div>
            <div className={`flex flex-1 sm:w-4/5 flex-col h-full ${selectedChatId && 'mt-6 sm:mt-0'}`}>
                <div className='block sm:hidden fixed top-8 left-4 pt-5 pl-0 rounded-full'>
                    <button className='font-bold text-[#D1007D]' onClick={toggleChatList}>{isChatlistVisible ? 'Close chatlist' : 'Open chatlist'}</button>
                </div>
                {selectedChatId && <Chats chatId={selectedChatId} receiverUser={receiverUser} />}
            </div>
        </div>
    )
}