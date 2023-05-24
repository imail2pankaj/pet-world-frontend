import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

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
  const { isAuthenticated } = useAuth();

  const [active, setActive] = useState('/')

  const [logoClass, setLogoClass] = useState('')
  
  useEffect(() => {
    if(router.asPath === '/') {
      setLogoClass("home-logo");
    }
    setActive(router.asPath);
  }, [router])
  

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  // Method that will fix header after a specific scrollable //
  const isSticky = (e) => {
    const header = document.querySelector('.main-nav');
    const scrollTop = window.scrollY;
    scrollTop >= 150 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" className='main-nav py-2.5'>
      <Navbar.Brand className={`me-5 ${logoClass}`}><Link href={'/'}><img src={`/logo-en.png`} alt={"Logo"} /></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {links.map(link => <Link key={link.path} className={`nav-link ${active === link.path ? 'act' : ''}`} href={link.path}>{t(link.name)}</Link>)}
        </Nav>
        <Nav>
          {isAuthenticated ?
            <Dropdown>
              <Dropdown.Toggle className='nav-link btn' variant='outlined' id="dropdown-basic">
                {t("My Account")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link className='dropdown-item' href="/accounts/profile"></Link>
                <Link className='dropdown-item' href="/accounts/change-password">Change Password</Link>
              </Dropdown.Menu>
            </Dropdown> :
            <Link className='nav-link btn' href="/auth/login">{t("My Account")}</Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header

// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { useTranslation } from 'next-i18next'
// import Navbar from 'react-bootstrap/Navbar';
// import { Nav } from 'react-bootstrap';
// import { useRouter } from 'next/router';

// const links = [
//   { path: '/', name: 'Home' },
//   { path: '/statistics', name: 'Statistics' },
//   { path: '/doctors', name: 'Doctors' },
//   { path: '/become-a-donator', name: 'Become a Donator' },
//   { path: '/campaigns', name: 'Campaigns' },
//   { path: '/events', name: 'Events' },
//   { path: '/about-us', name: 'About Us' },
//   { path: '/contact-us', name: 'Contact Us' },
// ]

// const Header = () => {
//   const { t } = useTranslation('common')
//   const router = useRouter();

//   const [active, setActive] = useState('/')
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     setActive(router.asPath);
//   }, [router])

//   return (
//     <Navbar bg="light" variant="light" expand="lg" expanded={expanded} className='main-nav py-2.5'>
//       <Navbar.Brand className='me-5' href="#home"><img src={`/logo-en.png`} alt={"Logo"} /></Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
//       <Navbar.Collapse id="basic-navbar-nav" expanded={false} >
//         <Nav className="me-auto">
//           {links.map(link => <Link key={link.path} onClick={() => setExpanded(expanded ? false : "expanded")} className={`nav-link ${active === link.path ? 'act' : ''}`} href={link.path}>{t(link.name)}</Link>)}
//         </Nav>
//         <Nav>
//           <Link className='nav-link btn' href="/login">{t("My Account")}</Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   )
// }

// export default Header