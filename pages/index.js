import Head from 'next/head'
import { Container } from 'react-bootstrap'
import {
  About,
  HeroSection,
  Statistics,
  WhyChoose,
  RecentCampaigns,
  UpcomingEvents,
  DonationProcess
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
        <Container fluid>
          <HeroSection />
          <Statistics />
          <About />
          <WhyChoose />
          <RecentCampaigns />
          <UpcomingEvents />
          <DonationProcess />
        </Container>
      </main>
    </>
  )
}
