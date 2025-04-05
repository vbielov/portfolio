'use client'

import styles from './article.module.css'

export default function Article({content}: {content: JSX.Element})
{
    return(
        <article className={styles.pageFace}>
            {content}
        </article>
    )
}