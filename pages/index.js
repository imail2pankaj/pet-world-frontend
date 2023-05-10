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

export default function Home() {
  return (
    <>
      <Head>
        <title>Pet World</title>
        <meta name="description" content="Pet World" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>        
          <HeroSection />
          <Container fluid="xxl">
            <Statistics />
            <About />
            <AboutDoctor />                       
          </Container>
          <WhyChoose /> 
          <RecentCampaigns />
          <UpcomingEvents />
          <DonationProcess />        
      </main>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      // Will be passed to the page component as props
    },
  }
}