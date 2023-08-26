import styles from './page.module.css'
import Header from './header'
import Article from './article'
import Footer from './footer'
import { useEffect, useRef } from 'react';

export default function Home()
{
  return (
    <main className={styles.main}>
      <Header/>

      <Article/>

      <Footer/>
    </main>
  )
}
