import Link from 'next/link'
import React from 'react'
import Button from './Button'
import Image from 'next/image'
import { Fugaz_One } from 'next/font/google';
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function HomePage() {
    return (
        <div className='flex flex-col lg:flex-row gap-4 h-full px-4 sm:p-8'>
            <div className='flex flex-col gap-20 my-1/2 h-full justify-center'>
                <div className='flex flex-col gap-4'>
                    <p className='text-6xl'>Welcome to <span className={'font-bold text-[#D1007D] ' + fugazOne.className}>Next Chat</span></p>
                    <p className='text-xl pl-8 italic font-bold '>– where messaging meets simplicity –</p>
                    <p className='text-3xl'>Join Next Chat and <span className={'text-[#FF8A5B] ' + fugazOne.className}>connect with anyone in a snap.</span></p>
                </div>
                <div className='flex flex-row'>
                    <div className='p-2'>
                        <Link href={'/signup'}>
                            <Button text="Sign Up" dark />
                        </Link>
                    </div>
                    <div className='p-2'>
                        <Link href={'/login'}>
                            <Button text="Log In" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center h-1/2 lg:h-auto w-full hidden sm:flex'>
                <Image
                    src="/mainpage.png"
                    alt='photo'
                    width={900}
                    height={700}
                    className='h-full w-auto object-contain' />
            </div>
        </div>
    )
}
