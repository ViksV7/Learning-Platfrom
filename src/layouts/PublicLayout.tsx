import type { ReactNode } from "react"
import Navbar from "../components/navbar"
import Footer from "../components/Footer"

interface PublicLayoutProps {
  children: ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-web3-gradient">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  )
}

export default PublicLayout
