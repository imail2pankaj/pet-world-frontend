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
import EventCard from '../Common/EventCard';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const Responsive = {
  0: {
    items: 1,
    margin: 5
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

const UpcomingEvents = () => {
  return (
    <div className='upcoming-events'>
    <div className='graphic-1'><img src={`/arrow.png`} alt={""} /></div>     
    <div className='graphic-2'><img src={`/paw-2.png`} alt={""} /></div>    
      <Containerer fluid="xxl"> 
          <Row>
            <h2 className='title'>
                <span>Upcoming</span>
                Events
            </h2>
          </Row>
          <Row>
            <OwlCarousel responsive={Responsive} nav={true} dots={true}>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
              </div>
              <div className="item">
                <EventCard/>
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

export default UpcomingEvents