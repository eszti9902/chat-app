import Link from 'next/link'
import React from 'react'
import Button from './Button'

export default function HomePage() {
    return (
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href={'/api/signup'}>
                <Button text="Sign Up" dark />
            </Link>
            <Link href={'/api/login'}>
                <Button text="Log In" />
            </Link>
        </div>
    )
}
