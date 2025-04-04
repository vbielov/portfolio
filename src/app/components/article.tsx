'use client'

import styles from './article.module.css'
import Earth from './earth'

export default function Article()
{
    const earthProps = {
        isTouchable: true
    }

    return(
        <article className={styles.pageFace}>
            <div className={styles.content}>
                <div className={styles.infoBlock}>
                    <h1 className={styles.title}>Willkommen</h1>
                    <p>
                        Mein Name ist Vladyslav Bielov,<br/>
                        ich bin Informatikstudent und Hobby-Entwickler mit Wohnsitz in Bayern, Deutschland.<br/>
                        Gelegentlich arbeite ich an kleinen Projekten im Bereich Game-Development und Back-End.<br/>
                        Ich begeistere mich für Algorithmen und dafür, wie Computer<br/>
                        und die digitale Welt um uns herum funktionieren.
                    </p>
                    <div>
                        <button className={styles.followButton}>
                            <a href="#">Kontakt</a>
                        </button>
                        <button className={styles.followButton}>
                            <a href="/projects">Meine Projekte</a>
                        </button>
                    </div>
                </div>

                <div className={styles.modelParent}>
                    <Earth {...earthProps}/>
                </div>
            </div>
        </article>
    )
}