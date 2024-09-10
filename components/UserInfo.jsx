import Image from 'next/image'
import React from 'react'

export default function UserInfo() {

    return (
        <div>
            <div className='flex items-center gap-5 pr-10'>
                <Image
                    src="/e.jpg"
                    alt="e"
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <h2>Nagy Pista</h2>
            </div>
        </div>
    )
}
