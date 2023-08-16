import styles from './page.module.css'
import Header from './header'
import Article from './article'
import Footer from './footer'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header/>

      <Article/>

      <Footer/>
    </main>
  )
}
