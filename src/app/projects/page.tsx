'use client'

import styles from './page.module.css'
import Footer from "../components/footer";
import Header from "../components/header";

export default function Projects() 
{
    return(
        <main className={styles.main}>
            <Header />
                <div className={styles.tileContainer}>
                    <a href="#" className={styles.tile}>
                        <div className={styles.tileBackground} />
                        <p className={styles.tileText}>
                            No projects yet...
                        </p>
                    </a>
                </div>
            <Footer />
        </main>
    );
}