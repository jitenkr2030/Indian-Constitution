import type { Metadata } from 'next'
import './globals.css'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'

export const metadata: Metadata = {
  title: 'Indian Constitution App',
  description: 'Your comprehensive guide to the Indian Constitution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}