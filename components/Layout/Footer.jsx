import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LanguageOption from '../Common/LanguageOption'
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <div>
      <LanguageOption /><br /><br />
      <Image src={`/logo-en.png`} width={150} height={30} alt={"Logo"} />
      Footer
      <div className='d-flex justify-content-between'>
        <Link href={'/login'} >{t('Login')}</Link>
        <Link href={'/register'} >{t('Register')}</Link>
        <Link href={'/launch-a-campaign'} >{t('Launch a Campaign')}</Link>
        <Link href={'/jobs'} >{t('Jobs')}</Link>
        <Link href={'/contact-us'} >{t('Contact Us')}</Link>
        <Link href={'/pages/privacy'} >{t('Privacy')}</Link>
        <Link href={'/pages/terms'} >{t('Terms')}</Link>
        <Link href={'/pages/cookies'} >{t('Cookies')}</Link>
        <Link href={'/pages/faq'} >{t('FAQs')}</Link>
        <Link href={'/pages/legal'} >{t('Legal')}</Link>
      </div>
    </div>
  )
}

export default Footer