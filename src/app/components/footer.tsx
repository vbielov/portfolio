'use client'

import styles from "./footer.module.css"

export default function Footer()
{
    return(
        <footer className={styles.footer}>
            <p>@2026 vbielov.github.io/portfolio</p>            
            {/* <a href="/privacyPolicy">Datenschutzerklärung</a> */}
        </footer>
    )
};