import React from 'react'

export default function Main(props) {
    const { children } = props;
    return (
        <main className='h-full overflow-hidden'>
            {children}
        </main>
    )
}