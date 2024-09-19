'use client'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Fugaz_One } from 'next/font/google';
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function Logout() {
    const { logout, currentUser } = useAuth()

    return (
        <div>
            {currentUser && <Link href={"/"}>
                <button onClick={logout} type="button" className={'' + fugazOne.className}>Log out</button>
            </Link>}
        </div>
    )
}
