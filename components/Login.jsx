'use client'
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Image from 'next/image';
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
            router.push("/chat")
        } catch (error) {
            console.log(error.message)
        } finally {
            setAuthenticating(false)
        }
    }

    return (
        <div className='flex flex-col h-full sm:flex-row gap-4 sm:gap-0 px-6 pb-6 w-full'>
            <div className='w-full sm:w-1/2 px-0 sm:px-8 md:px-16 h-full my-1/2 justify-center flex flex-col'>
                <h3 className={'pl-6 pb-5 text-6xl ' + fugazOne.className}>Hello again!</h3>
                <p className='pl-6 py-5 text-lg'>You&#39;re only one step away!</p>
                <div className='flex justify-center items-center'>
                    <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-4 w-full max-w-[400px]'>
                        <div className='flex-grow flex w-full bg-[#E5E5E5] mx-auto items-center rounded-md'>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                type='email'
                                required
                                className='bg-[#E5E5E5] rounded-md w-full mx-auto px-3 duration-200 hover:border-l-[#D1007D] focus:border-l-[#D1007D] py-2 sm:py-3 border-2 border-solid outline-none' />
                            <AiOutlineMail style={{ width: '20px', height: '20px' }} className='pr-1' />
                        </div>
                        <div className='flex-grow flex w-full bg-[#E5E5E5] mx-auto items-center rounded-md'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                type='password'
                                required
                                className='bg-[#E5E5E5] rounded-md w-full mx-auto px-3 duration-200 hover:border-l-[#D1007D] focus:border-l-[#D1007D] py-2 sm:py-3 border-2 border-solid outline-none' />
                            <RiLockPasswordLine style={{ width: '20px', height: '20px' }} className='pr-1' />
                        </div>
                        <div className='w-full'>
                            <Button type="submit" text={authenticating ? "Submitting" : "Sumbit"} />
                        </div>
                    </form>
                </div>
                {/* <div className='my-5 flex flex-grow items-center justify-center'> */}
                <p className='text-center my-5'>Don&#39;t have an account?
                    <Link href={"/signup"}>
                        <button className='text-base text-[#D1007D] font-bold pl-1'>Sign up</button>
                    </Link>
                </p>
                {/* </div> */}
                <div className=''>
                    <Link href={"/"}>
                        <button className={'pl-6 ' + fugazOne.className} type="button">Back</button>
                    </Link>
                </div>
            </div>
            <div className='w-1/2 hidden sm:block'>
                <Image
                    src='/chat-login.png'
                    alt='design'
                    width={500}
                    height={500}
                    className='w-full h-full object-fill rounded-md' />
            </div>
        </div>
    )
}
