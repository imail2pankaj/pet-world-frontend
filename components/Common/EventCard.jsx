import React from 'react'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import moment from 'moment';


const EventCard = ({ handleModal, handleEventDetails , event }) => {
  const image = event?.event_image ? event?.event_image : '/no-image.jpg';
  return (
    <div className='event-card' style={{ cursor: "pointer" }}>
      <Card onClick={() => { handleModal(true); handleEventDetails(event) }}>
        <div className='attendees'><span>55</span> Attendees</div>
        <div className='thumb'><Card.Img variant="top" src={image} /></div>
        <Card.Body>
          <Card.Title>{event?.title}</Card.Title>
          <Card.Text>{event?.short_description}</Card.Text>
          <div className='date-address'>
            <div className='address'>
              <img src={`/address-icon2.png`} alt={""} /> {event?.location}
            </div>
            <div className='address date'>
              <img src={`/calendar-icon2.png`} alt={""} /> <span>{moment(event?.event_date).format("DD/MM/YYYY")}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div >
  )
}

export default EventCard