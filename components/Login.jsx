'use client'
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticating, setAuthenticating] = useState(false)
    const router = useRouter()

    const { login } = useAuth()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setAuthenticating(true)
        try {
            await login(email, password)
            router.push("/api/chat")
        } catch (error) {
            console.log(error.message)
        } finally {
            setAuthenticating(false)
        }
    }

    return (
        <div className='flex flex-col flex-1 justify-center item-center gap-4 px-4'>
            <h3 className={' ' + fugazOne.className}>Log In</h3>
            <p>You&#39;re only one step away!</p>
            <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-4 w-full max-w-[400px]'>
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
            <p className='text-center'>Don&#39;t have an account?
                <Link href={"/api/signup"}>
                    <button className='text-slate-600'>Sign up</button>
                </Link>
            </p>
            <Link href={"/"}>
                <button type="button">Back</button>
            </Link>
        </div>
    )
}
