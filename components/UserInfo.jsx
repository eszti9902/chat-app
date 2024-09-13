'use client'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

export default function UserInfo() {
    const { userDataObj, loading } = useAuth()
    console.log(userDataObj.picture)

    useEffect(() => {
        if (userDataObj) {
            console.log(userDataObj.username)
        }
    }, [userDataObj])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <div className='flex items-center gap-5 pr-10'>
                <Image
                    src={userDataObj.picture || "/default.jpg"}
                    alt="picture"
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <h2>{userDataObj.username}</h2>
            </div>
        </div>
    )
}
