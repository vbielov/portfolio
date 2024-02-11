'use client'

import Image from 'next/image'
import styles from "./header.module.css"
import emailSVG from "@/public/email.svg"
import githubSVG from "@/public/github.svg"
import Earth from './earth'
import { usePathname } from 'next/navigation';

export default function Header()
{
    const earthProps = {
        isTouchable: false
    }
    
    return(
        <header className={styles.header}>
            {usePathname() !== '/' && 
                <a className={`${styles.link}`} href="/">
                    <div className={styles.logo}>
                        <Earth {...earthProps}/>
                    </div>
                </a>
            }
            <a className={styles.link} href="mailto:bielovlad@gmail.com?subject=Mail from vbielov.github.io">
                <Image
                    className={styles.linkSVG}
                    priority 
                    src={emailSVG}
                    height={32} 
                    width={32} 
                    alt="Write me an email"
                />
            </a>
            <a className={styles.link} href="https://github.com/vbielov">
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