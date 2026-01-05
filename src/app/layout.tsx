import Navbar from '@/components/Navbar';
import './globals.css'
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Rick & Morty Bakery',
  description: 'Explora el multiverso de Rick y Morty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
