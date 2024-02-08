'use client'

import Link from "next/link";
import styles from "./page.module.css"
import { useSession } from "next-auth/react";

export default function Header()
{
    const { data: session } = useSession();

    return (
        <header className={styles.header}>
            <div className={styles.elements}>
                <div className={styles.logo}>
                    <Link href="/"><h2>Nevermore</h2></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link href="">Forum</Link></li>
                        <li><Link href="">Support</Link></li>
                        <li><Link href="">Market</Link></li>
                    </ul>
                </nav>
                <nav>
                    <ul>
                        {
                        session ? (
                            <li>
                                <Link href={`/users/${session.user?.id}`}>
                                    {session.user?.name}
                                </Link>
                            </li>
                        ) : (
                            <li><Link href="/signIn">Sign in</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}