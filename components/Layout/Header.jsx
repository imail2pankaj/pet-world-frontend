import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';

const links = [
  { path: '/', name: 'Home' },
  { path: '/statistics', name: 'Statistics' },
  { path: '/doctors', name: 'Doctors' },
  { path: '/become-a-donator', name: 'Become a Donator' },
  { path: '/campaigns', name: 'Campaigns' },
  { path: '/events', name: 'Events' },
  { path: '/about-us', name: 'About Us' },
  { path: '/contact-us', name: 'Contact Us' },
]

const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter();

  const [active, setActive] = useState('/')

  useEffect(() => {
    setActive(router.asPath);
  }, [router])

  return (
    <Navbar bg="light" variant="light" expand="lg" className='main-nav py-2.5'>
      <Navbar.Brand className='me-5' href="#home"><img src={`/logo-en.png`} alt={"Logo"} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {links.map(link => <Link key={link.path} className={`nav-link ${active === link.path ? 'act' : ''}`} href={link.path}>{t(link.name)}</Link>)}
        </Nav>
        <Nav>
          <Link className='nav-link btn' href="/login">{t("My Account")}</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header