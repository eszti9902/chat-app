'use client'
import { Fugaz_One } from 'next/font/google';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from './Button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authenticating, setAuthenticating] = useState(false)
    const router = useRouter()

    const { signup } = useAuth()

    const handleSignUp = async (e) => {
        e.preventDefault()
        setAuthenticating(true)
        try {
            await signup(username, email, password)
            router.push("/api/login")
        } catch (error) {
            console.log(error.message)
        } finally {
            setAuthenticating(false)
        }
    }

    return (
        <div className='flex flex-col flex-1 justify-center item-center gap-4 px-4'>
            <h3 className={' ' + fugazOne.className}>Sign Up</h3>
            <p>Nice to have you here!</p>
            <form onSubmit={handleSignUp} className='flex flex-col items-center gap-4 w-full max-w-[400px]'>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    type='text'
                    required
                    className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border-2 border-solid border-slate-400 rounded-full outline-none' />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    type='email'
                    required
                    className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border-2 border-solid border-slate-400 rounded-full outline-none' />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    type='password'
                    required
                    className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border-2 border-solid border-slate-400 rounded-full outline-none' />
                <div className='w-fit mx-auto'>
                    <Button type="submit" text={authenticating ? "Submitting" : "Sumbit"} />
                </div>
            </form>
            <p className='text-center'>Already have an account?
                <Link href={"/api/login"}>
                    <button className='text-slate-600'>Log In</button>
                </Link>
            </p>
            <Link href={"/"}>
                <button type="button">Back</button>
            </Link>
        </div>
    )
}
