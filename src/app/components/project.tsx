'use client'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import styles from './project.module.css'

export default function Project({title, backsideText, background, link}: {title: string, backsideText: string, background: StaticImageData, link: string})
{
    return(
        <a href={link} className={styles.tile}>
            <div className={styles.tileBackground}>
            <Image height={background.width / 200 * 300} alt="Write me an email" src={background}/>
            </div>
            <p className={styles.tileText}>
                <span className={styles.tileTitle}>{title}</span>
                <span className={styles.tileBackside}>{backsideText}</span>
            </p>
        </a>
    )
}