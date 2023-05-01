import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <Image src={`/logo-en.png`} width={150} height={30} alt={"Logo"} />
      Footer
      <div className='d-flex justify-content-between'>
        <Link href={'/login'} >Login</Link>
        <Link href={'/register'} >Register</Link>
        <Link href={'/launch-a-campaign'} >Launch a Campaign</Link>
        <Link href={'/jobs'} >Jobs</Link>
        <Link href={'/contact-us'} >Contact Us</Link>
        <Link href={'/pages/privacy'} >Privacy</Link>
        <Link href={'/pages/terms'} >Terms</Link>
        <Link href={'/pages/cookies'} >Cookies</Link>
        <Link href={'/pages/faq'} >FAQs</Link>
        <Link href={'/pages/legal'} >Legal</Link>
      </div>
    </div>
  )
}

export default Footer