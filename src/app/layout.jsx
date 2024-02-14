import Navbar from '@/components/Navbar'
import '@/app/globals.css'
import { Gabarito } from 'next/font/google'

const gabarito = Gabarito({ subsets: ['latin'] })

export const metadata = {
  title: 'D-Animelist',
  description: 'Website Anime Indonesia',
  icons:{
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png']
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-color-dark`} suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}