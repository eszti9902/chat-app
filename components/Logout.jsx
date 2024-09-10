'use client'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Logout() {
    const { logout, currentUser } = useAuth()

    return (
        <div>
            {currentUser && <Link href={"/"}>
                <button onClick={logout} type="button">Log out</button>
            </Link>}
        </div>
    )
}
