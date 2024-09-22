import { Fugaz_One } from 'next/font/google';
import React from 'react'
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Button(props) {
    const { text, dark, type } = props
    return (
        <button type={type} className={'rounded-md overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-[#FF8A5B] w-full ' + (dark ? 'text-white bg-[#FF8A5B] ' : 'text-[#D1007D] ')}>
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + fugazOne.className}>{text}</p>
        </button>
    )
}
