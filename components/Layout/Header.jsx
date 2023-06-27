import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Button, Dropdown, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { defaultAvatar } from '@/core/utils/constants';
import privateNavigation from '@/core/utils/private-navigation';

const links = [
  { path: '/', name: 'Home' },
  { path: '/statistics', name: 'Statistics' },
  { path: '/doctors', name: 'Doctors' },
  { path: '/become-a-subscriber', name: 'Become a Subscriber' },
  { path: '/campaigns', name: 'Campaigns' },
  { path: '/events', name: 'Events' },
  { path: '/about-us', name: 'About Us' },
  { path: '/contact-us', name: 'Contact Us' },
]

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
            <MyAccount handleToggleMenu={toggleMenu} handleLogout={logout} /> :
            <Link className='nav-link btn' onClick={toggleMenu} href="/auth/login">{t("My Account")}</Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
const NotificationCounter = ({ notifications, className = '' }) => {
  return notifications != 0 && <Badge className={`${className} badge rounded-pill bg-primary`}>{notifications}</Badge>
}

const MyAccount = ({ handleToggleMenu, handleLogout }) => {

  const { t } = useTranslation('common')
  const [active, setActive] = useState('')
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setActive(router.asPath);
  }, [router])

  return (
    <Dropdown className="my-account-dropdown">
      <Dropdown.Toggle className='nav-link btn' variant='outlined' id="my-account-dropdown">
        <div className='d-inline-block'>
          <span style={{ position: 'relative' }}>
            <NotificationCounter notifications={user?.notifications} className={'position-absolute top-0 start-100 translate-middle'} />
            <Image width={25} height={25} src={user?.profile_image ? `${user?.profile_image}` : defaultAvatar} className='rounded-circle' alt='Avatar' />
          </span>
          <span className='ms-2'>
            {t(user?.first_name)}
          </span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {privateNavigation.map(nav =>
          (nav.for === "" || (user && user?.role === nav.for)) && <Fragment key={nav.name} >
            <Link onClick={handleToggleMenu} className={`dropdown-item flex ${active === nav.path ? 'active' : ''}`} href={nav.path}>
              {t(nav.name)}
              {nav.path === '/dashboard/notifications' && <NotificationCounter className='ms-2' notifications={user?.notifications} />}
            </Link>
          </Fragment>
        )}
        <Button onClick={handleLogout} className='dropdown-item'>{t('Logout')}</Button>
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default Header