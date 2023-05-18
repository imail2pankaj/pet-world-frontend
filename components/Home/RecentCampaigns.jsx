import React from 'react'
import Containerer from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


var $ = require("jquery");
if (typeof window !== "undefined") {
  // Client-side-only code
  window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import CampaignCard from '../Common/CampaignCard';

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

const RecentCampaigns = () => {
  return (
    <div className='recent-campaigns'>
    <div className='graphic-1'><img src={`/stars-img.png`} alt={""} /></div>     
    <div className='graphic-2'><img src={`/paper-plan.png`} alt={""} /></div>    
      <Containerer fluid="xxl"> 
          <Row>
            <h2 className='title'>
                <span>Recent</span>
                Campaigns
            </h2>
          </Row>
          <Row>
            <OwlCarousel responsive={Responsive} nav={true} dots={true} >
              <div className="item">
                <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>

              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
              <div className="item">
              <CampaignCard/>
              </div>
            </OwlCarousel>
          </Row>
          <Row className="justify-content-center">
            <a className='button-1' href='#!' role='button'>View all</a>
          </Row>
      </Containerer>      
      </div>
  )
}

export default RecentCampaigns