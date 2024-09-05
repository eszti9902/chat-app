'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Chatlist from './Chatlist'
import Loading from './Loading'
import Login from './Login'
import AddUser from './AddUser'

export default function Chat() {
    const { currentUser, userDataObj, loading, logout } = useAuth()
    const [data, setData] = useState({})

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
    // signOut(auth).then(() => console.log('im out'))
    // localStorage.clear();
    // sessionStorage.clear();
    return (
        <>
            <div>Chat</div>
            <Chatlist />
            <Link href={"/"}>
                <button onClick={logout} type="button">Log out</button>
            </Link>

        </>
    )
}
