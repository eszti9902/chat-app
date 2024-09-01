'use client'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import Login from './Login'
import Loading from './Loading'
import Button from './Button'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import Link from 'next/link'

export default function Chat() {
    const { currentUser, userDataObj, loading, logout, signout } = useAuth()
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
            <Link href={"/"}>
                <button onClick={logout} type="button">Log out</button>
            </Link>

        </>
    )
}
