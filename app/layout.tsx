import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Day & Night - Premium E-commerce',
  description: 'Discover premium products for day and night',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}