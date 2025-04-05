'use client'

import Image from 'next/image'
import styles from "./header.module.css"
import emailSVG from "@/public/email.svg"
import githubSVG from "@/public/github.svg"
import linkedInSVG from "@/public/linkedin.svg"
import Earth from './earth'
import { usePathname } from 'next/navigation';
import Link from 'next/link'

export default function Header()
{
    const earthProps = {
        isTouchable: false
    }
    
    return(
        <header className={styles.header}>
            <div>
                {usePathname() !== '/' && 
                    <Link className={styles.link + " " + styles.logo} href="/">
                        <Earth {...earthProps}/>
                    </Link>
                }
            </div>
            <div>
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
                <a className={styles.link} href="https://www.linkedin.com/in/vladyslav-bielov/">
                    <Image
                        className={styles.linkSVG}
                        priority 
                        src={linkedInSVG}
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
            </div>
        </header>
    )
}