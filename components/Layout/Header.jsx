import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='d-flex justify-content-between'>
      <Image src={`/logo-en.png`} width={150} height={30} alt={"Logo"} />
      <Link href={'/'} >Home</Link>
      <Link href={'/statistics'} >Statistics</Link>
      <Link href={'/doctors'} >For Doctors</Link>
      <Link href={'/campaigns'} >Campaigns</Link>
      <Link href={'/events'} >Events</Link>
      <Link href={'/about-us'} >About Us</Link>
      <Link href={'/login'} >My Account</Link>
    </div>
  )
}

export default Header