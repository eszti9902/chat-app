'use client'
import { Fugaz_One } from 'next/font/google';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from './Button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authenticating, setAuthenticating] = useState(false)
    const [picture, setPicture] = useState({ file: null, url: "" })

    const router = useRouter()

    const { signup } = useAuth()

    const handleSignUp = async (e) => {
        e.preventDefault()
        setAuthenticating(true)
        try {
            const registrationResult = await signup(username, email, password, picture)

            if (registrationResult.success) {
                router.push("/login")
            } else {
                alert("This user already exists, please try again or log in!")
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setAuthenticating(false)
        }
    }

    const handlePicture = (e) => {
        if (e.target.files[0]) {
            setPicture({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    return (
        <div className='flex flex-col h-full sm:flex-row gap-4 sm:gap-0 px-6 pb-6 w-full'>
            <div className='w-full sm:w-1/2 px-0 sm:px-8 md:px-16 h-full my-1/2 justify-center flex flex-col'>
                <h3 className={'pl-6 pb-5 text-6xl ' + fugazOne.className}>Hello there!</h3>
                <p className='pl-6 py-5 text-lg'>Nice to have you here!</p>
                <div className='flex justify-center items-center'>
                    <form onSubmit={handleSignUp} className='flex flex-col items-center gap-4 w-full max-w-[400px]'>
                        <label htmlFor='file' className='cursor-pointer flex items-center gap-2'>
                            <Image
                                src={picture.url || `/default.jpg`}
                                alt='picture'
                                width={50}
                                height={50}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            Upload a picture</label>
                        <input id='file' type='file' className='hidden' onChange={handlePicture} />
                        <div className='flex-grow flex w-full bg-[#E5E5E5] mx-auto items-center rounded-md'>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Username'
                                type='text'
                                required
                                className='bg-[#E5E5E5] rounded-md w-full mx-auto px-3 duration-200 hover:border-l-[#D1007D] focus:border-l-[#D1007D] py-2 sm:py-3 border-2 border-solid outline-none' />
                            <FaRegUser style={{ width: '18px', height: '18px' }} className='pr-1' />
                        </div>
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
                            <Button type="submit" text={authenticating ? "Submitting" : "Submit"} />
                        </div>
                    </form>
                </div>
                <p className='text-center my-5'>Already have an account?
                    <Link href={"/login"}>
                        <button className='text-base text-[#D1007D] font-bold pl-1'>Log In</button>
                    </Link>
                </p>
                <Link href={"/"}>
                    <button className={'pl-6 ' + fugazOne.className} type="button">Back</button>
                </Link>
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
