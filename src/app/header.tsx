'use client'

import Image from 'next/image'
import styles from "./header.module.css"
import emailSVG from "@/public/email.svg"
import githubSVG from "@/public/github.svg"

export default function Header()
{
    return(
        <header className={styles.header}>
            <a className={styles.link} href="mailto:tempmail@gmail.com?subject=Mail from vofes.github.io">
                <Image
                    className={styles.linkSVG}
                    priority 
                    src={emailSVG}
                    height={32} 
                    width={32} 
                    alt="Write me an email"
                />
            </a>
            <a className={styles.link} href="https://github.com/vofes">
                <Image
                    className={styles.linkSVG}
                    priority 
                    src={githubSVG}
                    height={32} 
                    width={32} 
                    alt="Write me an email"
                />
            </a>
        </header>
    )
}