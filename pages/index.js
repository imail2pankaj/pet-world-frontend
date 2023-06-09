import Head from 'next/head'
import { Container } from 'react-bootstrap'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  HeroSection,
  Statistics,
  About,
  AboutDoctor,
  WhyChoose,
  RecentCampaigns,
  UpcomingEvents,
  DonationProcess,
} from '@/components/Home';
import { useEffect } from 'react';
import axiosInstance from '@/store/api/axiosInstance';
import { NextSeo } from 'next-seo';
import axios from 'axios';

export default function Home({ appSettings }) {
  return (
    <>
      <NextSeo title={appSettings?.app?.title} />
      <main>
        <HeroSection />
        <Container fluid="xxl">
          <Statistics statistics={appSettings?.statistics} />
          <About />
          <AboutDoctor />
        </Container>
        <WhyChoose />
        {appSettings?.campaigns?.length > 0 ? <RecentCampaigns campaigns={appSettings?.campaigns} /> : null}
        {appSettings?.recentEvents?.length > 0 ? <UpcomingEvents events={appSettings?.recentEvents} /> : null}
        <DonationProcess />
      </main>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`);
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      appSettings: home?.data
      // Will be passed to the page component as props
    },
    // revalidate: 10,
  }
}