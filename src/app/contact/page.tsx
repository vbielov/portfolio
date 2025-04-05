'use client'

import styles from './page.module.css';
import Header from '../components/header';
import headerStyles from "../components/header.module.css"
import Footer from '../components/footer';
import Article from '../components/article';
import Image from 'next/image'
import emailSVG from "@/public/email.svg"

export default function Contact() 
{
    const article = {
        content: <div>
            <h1>Contact Me!</h1>
            <br/>
            <h2>Vladyslav Bielov</h2> 
            <br/>
            <p>
                Maierhoferweg 7A, 85221 Dachau <br/>
                Tel.: +49 1523 2166382<br/>
                Email: bielovlad@gmail.com
            </p>
            <br/>
            <div>
                <a href="mailto:bielovlad@gmail.com?subject=Mail from vbielov.github.io">
                    <Image
                        className={headerStyles.linkSVG}
                        priority 
                        src={emailSVG}
                        height={32} 
                        width={32} 
                        alt="Write me an email"
                    />
                </a>
            </div>
        </div>
    }

    return (
        <main className={styles.main}>
            <Header />
            <Article {...article} />
            <Footer />
        </main>
    )           
} 