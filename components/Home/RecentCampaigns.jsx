import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


var $ = require("jquery");
if (typeof window !== "undefined") {
  // Client-side-only code
  window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import { CampaignCard } from '../Common';
import Link from 'next/link';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const Responsive = {
  0: {
    items: 1,
    margin: 0
  },
  768: {
    items: 2,
    margin: 19
  },
  1024: {
    items: 3,
    margin: 29
  },
  1280: {
    items: 4,
    margin: 29
  }
}

const RecentCampaigns = ({campaigns}) => {
  return (
    <div className='recent-campaigns'>
      <div className='graphic-1'><img src={`/stars-img.png`} alt={""} /></div>
      <div className='graphic-2'><img src={`/paper-plan.png`} alt={""} /></div>
      <Container fluid="xxl">
        <Row>
          <h2 className='title'>
            <span>Recent</span>
            Campaigns
          </h2>
        </Row>
        <Row>
          <OwlCarousel responsive={Responsive} nav={true} dots={true} >
            {campaigns.map((item, index) => <div key={item.id} className="item">
              <CampaignCard campaign={item} is_paid={(index % 2) == 0} />
            </div>)}
          </OwlCarousel>
        </Row>
        <Row className="justify-content-center">
          <Link className='button-1' href='/campaigns' role='button'>View all</Link>
        </Row>
      </Container>
    </div>
  )
}

export default RecentCampaigns