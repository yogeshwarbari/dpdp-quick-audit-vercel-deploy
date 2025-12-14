// frontend/components/Navbar.js

import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const isActive = (path) => router.pathname === path

  const links = [
    { name: 'Scanner', path: '/' },
    { name: 'Checks', path: '/checks' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px'
      }}>
        {/* Logo */}
        <Link href="/">
          <span style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            cursor: 'pointer'
          }}>
            🔐 DPDP Audit
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {links.map((link) => (
            <Link key={link.path} href={link.path}>
              <span style={{
                color: isActive(link.path) ? '#3b82f6' : '#6b7280',
                textDecoration: 'none',
                fontWeight: isActive(link.path) ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                borderBottom: isActive(link.path) ? '2px solid #3b82f6' : 'none',
                paddingBottom: '8px',
                transition: 'all 0.3s'
              }}>
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}