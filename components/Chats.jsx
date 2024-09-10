'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BsEmojiHeartEyes } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import EmojiPicker from 'emoji-picker-react';

export default function Chats() {
    const [text, setText] = useState('')
    const endRef = useRef(null)
    const [isEmojiOpen, setIsEmojiOpen] = useState(false)

    // scrolling to the end of messages
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    console.log(text)

    const handleOpenEmoji = () => {
        setIsEmojiOpen((prev) => !prev)
    }

    const handleEmoji = (e) => {
        console.log(e)
        setText((prev) => prev + e.emoji)
        setIsEmojiOpen(false)
    }

    return (
        <div className='flex flex-1 flex-col h-full'>
            <div id='top' className='pl-5 flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <Image
                        src="/e.jpg"
                        alt="e"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <h2 className='font-bold'>Nagy Pista</h2>
                </div>
            </div>
            <div id='center' className='flex flex-col gap-5 p-5 flex-1 overflow-y-scroll'>
                <div id='message' className='max-w-[70%] flex gap-5'>
                    <Image
                        src="/e.jpg"
                        alt="e"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', objectFit: 'cover', width: '50px', height: '50px' }}
                    />
                    <div id='texts' className='flex flex-1 flex-col gap-2'>
                        <p className='p-3 rounded-lg bg-[#FFE066]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span className='text-sm'>1 min ago</span>
                    </div>
                </div>
                <div id='message' className='max-w-[70%] flex gap-5 self-end'>
                    <div id='texts' className='flex flex-1 flex-col gap-2'>
                        <Image
                            src="/gekko.webp"
                            alt='gekko'
                            width={400}
                            height={400}
                            style={{ borderRadius: '10px' }}
                        />
                        <p className='p-3 rounded-lg bg-[#FF8A5B]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span className='text-sm'>1 min ago</span>
                    </div>
                </div>
                <div id='message'>
                    <Image
                        src="/e.jpg"
                        alt="e"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div id='texts'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div id='message'>
                    <div id='texts'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div id='message'>
                    <Image
                        src="/e.jpg"
                        alt="e"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div id='texts'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div id='message'>
                    <div id='texts'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div id='message'>
                    <Image
                        src="/e.jpg"
                        alt="e"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div id='texts'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div id='message'>
                    <div id='texts'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cumque perferendis mollitia, error illo adipisci, facere autem dolorum id dolores harum atque, eum libero sequi repudiandae nobis! Quas, consequuntur dolorem.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div id='bottom' className='mt-auto bg-[#E5E5E5] flex gap-5 items-center p-5 justify-between'>
                {/* <div id='icons' className='flex gap-5'></div> */}
                <input className='flex-1 pl-2 w-4/5 bg-transparent text-[#1F1F1F] border-none outline-none' type='text' placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />
                <div id='emoji' className='relative'>
                    <BsEmojiHeartEyes onClick={handleOpenEmoji} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <div className='absolute bottom-5 right-0'>
                        <EmojiPicker open={isEmojiOpen} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button><FiSend style={{ width: '20px', height: '20px' }} /></button>
            </div>
        </div>
    )
}
