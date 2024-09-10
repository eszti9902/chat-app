'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function Chats() {
    const [text, setText] = useState('')
    const endRef = useRef(null)

    // scrolling to the end of messages
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    console.log(text)
    return (
        <div className='flex-1'>
            <input type='text' placeholder='Type a message...' onChange={(e) => setText(e.target.value)} />
            <div ref={endRef}></div>
        </div>
    )
}
