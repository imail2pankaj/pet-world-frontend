import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Button, Dropdown, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { defaultAvatar } from '@/core/utils/constants';

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
const navigation = [
  { path: "/dashboard", name: 'Dashboard', for: "" },
  { path: "/dashboard/campaigns", name: 'Campaigns', for: "DOCTOR" },
  { path: "/dashboard/campaign-requests", name: 'Campaign Requests', for: "DOCTOR" },
  { path: "/dashboard/donations", name: 'Donations', for: "DONOR" },
  { path: "/dashboard/pets", name: 'Pets', for: "DONOR" },
  { path: "/dashboard/notifications", name: 'Notifications', for: "" },
  { path: "/accounts/profile", name: 'Profile', for: "" },
  { path: "/accounts/about", name: 'Bio', for: "DOCTOR" },
  { path: "/accounts/change-password", name: 'Change Password', for: "" },
];
const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  const [active, setActive] = useState('/')
  const [windowWidth, setWindowWidth] = useState()
  const [expanded, setExpanded] = useState(false);
  const [logoClass, setLogoClass] = useState('')

  useEffect(() => {
    if (router.asPath === '/') {
      setLogoClass("home-logo");
    }
    setActive(router.asPath);
    setWindowWidth(window.innerWidth);
  }, [router])

  const toggleMenu = () => {
    if (windowWidth <= 1200) {
      setExpanded(expanded ? false : "expanded")
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    const handleResize = (event) => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', isSticky);
      window.removeEventListener('resize', handleResize)
    };
  }, []);

  // Method that will fix header after a specific scrollable //
  const isSticky = (e) => {
    const header = document.querySelector('.main-nav');
    const scrollTop = window.scrollY;
    scrollTop >= 150 ? header?.classList?.add('is-sticky') : header?.classList?.remove('is-sticky');
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" expanded={expanded} className='main-nav py-2.5'>
      <Navbar.Brand className={`me-5 ${logoClass}`}><Link href={'/'}><img src={`/logo-en.png`} alt={"Logo"} /></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {links.map(link => <Link key={link.path} onClick={toggleMenu} className={`nav-link ${active === link.path ? 'act' : ''}`} href={link.path}>{t(link.name)}</Link>)}
        </Nav>
        <Nav>
          {isAuthenticated ?
            <Dropdown>
              <Dropdown.Toggle className='nav-link btn' variant='outlined' id="dropdown-basic">
                <div className='d-inline-block'>
                  <span style={{ position: 'relative' }}>
                    {user?.notifications != 0 && <Badge className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"'>{user?.notifications}</Badge>}
                    <Image width={25} height={25} src={user?.profile_image ? `${user?.profile_image}` : defaultAvatar} className='rounded-circle' alt='Avatar' />
                  </span>
                  <span className='ms-2'>
                    {t("My Account")}
                  </span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {navigation.map(nav => (nav.for === "" || (user && user?.role === nav.for)) && <Link key={nav.name} onClick={toggleMenu} className='dropdown-item' href={nav.path}>{t(nav.name)}</Link>)}
                <Button onClick={logout} className='dropdown-item'>{t('Logout')}</Button>
              </Dropdown.Menu>
            </Dropdown> :
            <Link className='nav-link btn' onClick={toggleMenu} href="/auth/login">{t("My Account")}</Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header