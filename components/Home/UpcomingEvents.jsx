import React, { useState } from 'react'
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
import Link from 'next/link';
import { EventCard, EventModal } from '../Common';

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

const UpcomingEvents = ({events}) => {

  const [modalShow, setModalShow] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  return (
    <div className='upcoming-events'>
      <EventModal show={modalShow} eventDetails={eventDetails} onHide={() => setModalShow(false)} />
      <div className='graphic-1'><img src={`/arrow.png`} alt={""} /></div>
      <div className='graphic-2'><img src={`/paw-2.png`} alt={""} /></div>
      <Container fluid="xxl">
        <Row>
          <h2 className='title'>
            <span>Upcoming</span>
            Events
          </h2>
        </Row>
        <Row>
          <OwlCarousel responsive={Responsive} nav={true} dots={true}>
            {events && events.map(event =>
              <div className="item" key={event.id}>
                <EventCard handleModal={setModalShow} handleEventDetails={setEventDetails} event={event} />
              </div>
            )}
          </OwlCarousel>
        </Row>
        <Row className="justify-content-center">
          <Link className='button-1' href='/events' role='button'>View all</Link>
        </Row>
      </Container>
    </div>
  )
}
export default UpcomingEvents