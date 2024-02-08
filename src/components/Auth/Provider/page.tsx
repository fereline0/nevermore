'use client'

import { SessionProvider } from 'next-auth/react'

interface IProvider
{
    children: React.ReactNode,
}

export default function Provider(props: IProvider)
{
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    )
}