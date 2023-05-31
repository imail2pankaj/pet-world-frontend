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

export default function Home({appSettings}) {
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
        <RecentCampaigns />
        <UpcomingEvents events={appSettings?.recentEvents} />
        <DonationProcess />
      </main>
    </>
  )
}

export async function getStaticProps({ locale }) {
  const home = await axiosInstance.get('/');
  console.log(home?.data?.recentEvents);
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      appSettings: home?.data
      // Will be passed to the page component as props
    },
    revalidate: 10,
  }
}