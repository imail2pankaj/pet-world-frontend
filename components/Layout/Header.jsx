import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';


const Header = () => {
  const { t } = useTranslation('common')
  return (
    <Navbar bg="light" variant="light" expand="lg" className='main-nav py-2.5'>
      <Navbar.Brand className='me-5' href="#home"><img src={`/logo-en.png`} alt={"Logo"} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className='act' href="/">{t("Home")}</Nav.Link>
          <Nav.Link href="/statistics">{t("Statistics")}</Nav.Link>
          <Nav.Link href="/doctors">{t("Doctors")}</Nav.Link>
          <Nav.Link href="/become-a-donator">{t("Become a Donator")}</Nav.Link>
          <Nav.Link href="/campaigns">{t("Campaigns")}</Nav.Link>
          <Nav.Link href="/events">{t("Events")}</Nav.Link>
          <Nav.Link href="/about-us">{t("About Us")}</Nav.Link>
          <Nav.Link href="/contact-us">{t("Contact Us")}</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className='nav-link btn' href="/login">{t("My Account")}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <div className='d-flex justify-content-between'>
    //   <Image src={`/logo-en.png`} width={150} height={30} alt={"Logo"} />
    //   <Link href={'/'} >{t("Home")}</Link>
    //   <Link href={'/statistics'} >{t("Statistics")}</Link>
    //   <Link href={'/doctors'} >{t("Doctors")}</Link>
    //   <Link href={'/campaigns'} >{t("Campaigns")}</Link>
    //   <Link href={'/become-a-donator'} >{t("Become a Donator")}</Link>
    //   <Link href={'/events'} >{t("Events")}</Link>
    //   <Link href={'/about-us'} >{t("About Us")}</Link>
    //   <Link href={'/login'} >{t("My Account")}</Link>
    // </div>
  )
}

export default Header