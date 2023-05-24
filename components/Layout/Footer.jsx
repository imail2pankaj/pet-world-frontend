import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LanguageOption from '../Common/LanguageOption'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@/hooks/useAuth';

const Footer = () => {
  const { t } = useTranslation('common');
  const { isAuthenticated } = useAuth();
  return (
    <div className='footer-main'>
      <Container fluid="xxl">
        <Row className='top-row'>
          <Col md={12} lg={4} className="justify-content-md-center">
            <img src={`/logo-en.png`} width={180} alt={"Logo"} />
            <LanguageOption />
          </Col>
          <Col>
            <h4>About</h4>
            {!isAuthenticated ? (<><Link href={'/auth/login'} >{t('Login')}</Link><br /><Link href={'/auth/register'} >{t('Register')}</Link><br /></>) : <><Link href={'/accounts/profile'} >{t('My Account')}</Link><br /></>}
            <Link href={'/launch-a-campaign'} >{t('Launch a Campaign')}</Link><br />
            <Link href={'/jobs'} >{t('Jobs')}</Link><br />
            <Link href={'/contact-us'} >{t('Contact Us')}</Link>
          </Col>
          <Col>
            <h4>Legal</h4>
            <Link href={'/pages/privacy'} >{t('Privacy')}</Link><br />
            <Link href={'/pages/terms'} >{t('Terms')}</Link><br />
            <Link href={'/pages/support'} >{t('Support')}</Link><br />
            <Link href={'/pages/faq'} >{t('FAQs')}</Link><br />
            <Link href={'/pages/legal'} >{t('Legal')}</Link>
          </Col>
          <Col>
            <h4>Get our app</h4>
            <div className='play-store-btn'><Link href={'/'}><img src={`/app-store-img.png`} alt={"Apple Store"} /></Link></div>
            <div className='play-store-btn'><Link href={'/'}><img src={`/g-play-img.png`} alt={"Google Play Store"} /></Link></div>
          </Col>
        </Row>

        <div className='copyright'>© PetWorld. 2023</div>
        <div className='social'>
          Follow us:
          <Link href={'/#'}><img src={`/fb-icon.png`} alt={"Facebook"} /></Link>
          <Link href={'/#'}><img src={`/tw-icon.png`} alt={"Twitter"} /></Link>
          <Link href={'/#'}><img src={`/in-icon.png`} alt={"linkedin"} /></Link>
          <Link href={'/#'}><img src={`/insta-icon.png`} alt={"Instagram"} /></Link>
        </div>

      </Container>
    </div>
  )
}

export default Footer