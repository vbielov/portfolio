import './globals.css'
import styles from './layout.module.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const monteserratFont = Montserrat({ 
  subsets: ['latin'],
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Vladyslav Bielov Portfolio',
  description: 'My portfolio made with nextjs, react, threejs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={monteserratFont.className}>{children}</body>
    </html>
  )
}
