import './globals.css'
import styles from './layout.module.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const monteserratFont = Montserrat({ 
  subsets: ['latin'],
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Small project with nextjs, react, threejs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={monteserratFont.className}>{children}</body>
    </html>
  )
}
