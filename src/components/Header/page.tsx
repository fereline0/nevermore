'use client'

import Link from "next/link";
import styles from "./page.module.css"
import header from "./header";
import IHeader from "@/types/header.type";
import { useSession } from "next-auth/react";

export default function Header()
{
    const { data: session, status } = useSession();

    return (
        <header className={styles.header}>
            <div className={styles.elements}>
                <div className={styles.logo}>
                    <Link href="/"><h2>Nevermore</h2></Link>
                </div>
                <nav>
                    <ul>
                        {
                            header.map((element: IHeader) => {
                                return (
                                    <li className={styles.link}><Link href={element.link}>{element.name}</Link></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <nav>
                    <ul>
                        {
                        status == "authenticated" ? (
                            <li className={styles.link}>
                                <Link href={`/users/${session.user?.id}`}>
                                    {session.user?.name}
                                </Link>
                            </li>
                        ) : (
                            <li className={styles.link}><Link href="/signIn">Sign in</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}