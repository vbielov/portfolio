'use client'

import styles from './article.module.css'
import Earth from './earth'

export default function Article()
{
    return(
        <article className={styles.pageFace}>
            <div className={styles.content}>
                <div className={styles.infoBlock}>
                    <h1 className={styles.title}>Welcome</h1>
                    <p>
                        My name is ..., I am amateur developer and IT student, based in ... <br/>
                        From time to time I am developing small projects in gamedev and front-end. <br/>
                        I am passionate about algorithms, how computers and <br/>
                        the digital world around us works.
                    </p>
                    <button className={styles.followButton}>
                        <a href="#">Contact me!</a>
                    </button>
                </div>

                <div className={styles.modelParent}>
                    <Earth/>
                </div>
            </div>
        </article>
    )
}