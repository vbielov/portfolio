import styles from './page.module.css'
import Header from './components/header'
import Article from './components/article'
import Footer from './components/footer'
import Earth from './components/earth'
import { useEffect, useRef } from 'react';

export default function Home()
{
    const earthProps = {
        isTouchable: true
    }

    const article = { 
        content: <div className={styles.content}>
            <div className={styles.infoBlock}>
                <h1 className={styles.title}>Willkommen</h1>
                <p>
                    Mein Name ist <b>Vladyslav Bielov</b>,<br/>
                    ich bin Informatikstudent und Hobby-Entwickler mit Wohnsitz in Bayern, Deutschland.<br/>
                    Gelegentlich arbeite ich an kleinen Projekten im Bereich Game-Development und Back-End.<br/>
                    Ich begeistere mich für Algorithmen und dafür, wie Computer<br/>
                    und die digitale Welt um uns herum funktionieren.
                </p>
                <div>
                    <button className={styles.followButton}>
                        <a href="/contact">Kontakt</a>
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
    }

    return (
    <main className={styles.main}>
        <Header/>

        <Article {...article}/>

        <Footer/>
    </main>
    )
}
