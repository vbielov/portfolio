import styles from './page.module.css'
import Header from './components/header'
import Article from './components/article'
import Footer from './components/footer'
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
