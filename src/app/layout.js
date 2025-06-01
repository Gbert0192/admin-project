import './globals.css'
import Sidebar from '@/components/ui/sidebar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  )
}
