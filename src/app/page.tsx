'use client'
import Image from 'next/image'
import styles from './page.module.css'

import nextSVG from '@/public/next.svg'
import vercelLogoSVG from '@/public/vercel.svg'

import Model3D from './threeModel'
import { useEffect, useState } from 'react'

export default function Home() {
  const [something, doSomething] = useState(420);

  return (
    <main className={styles.main}>
      <div className={styles.pageFace}>
        <div className={styles.infoBlock}>
          <h1 className={styles.title}>Hello!</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <button className={styles.followButton} onClick={() => {
            doSomething(something + 15);
            console.log('clicked' + something);
          }}>Follow me</button>
        </div>
        <div className={styles.modelParent}>
          <Model3D modelSource="earth.glb" position={[0, 0, 0]} scale={[0.75, 0.75, 0.75]} rotation={[0.6, 0, 0]} orbitControl={true}/>
        </div>
      </div>
    </main>
  )
}
