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
                    <h1 className={styles.title}>Welcome</h1>
                    <p>
                        My name is Vladyslav Bielov,<br/> 
                        I am amateur developer and IT student, based in Munich, Germany <br/>
                        From time to time I am developing small projects in gamedev and front-end. <br/>
                        I am passionate about algorithms, how computers and <br/>
                        the digital world around us works.
                    </p>
                    <div>
                        <button className={styles.followButton}>
                            <a href="#">Contact me</a>
                        </button>
                        <button className={styles.followButton}>
                            <a href="/projects">My projects</a>
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