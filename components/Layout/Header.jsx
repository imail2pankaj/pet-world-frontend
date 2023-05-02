import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const { t } = useTranslation('common')
  return (
    <div className='d-flex justify-content-between'>
      <Image src={`/logo-en.png`} width={150} height={30} alt={"Logo"} />
      <Link href={'/'} >{t("Home")}</Link>
      <Link href={'/statistics'} >{t("Statistics")}</Link>
      <Link href={'/doctors'} >{t("Doctors")}</Link>
      <Link href={'/campaigns'} >{t("Campaigns")}</Link>
      <Link href={'/become-a-donator'} >{t("Become a Donator")}</Link>
      <Link href={'/events'} >{t("Events")}</Link>
      <Link href={'/about-us'} >{t("About Us")}</Link>
      <Link href={'/login'} >{t("My Account")}</Link>
    </div>
  )
}

export default Header