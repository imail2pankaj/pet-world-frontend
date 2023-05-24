import React from 'react'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';


const EventCard = (props) => {
  return (
    <div className='event-card' style={{ cursor: "pointer" }}>
      <Card onClick={() => props.handelmodel(true)}>
        <div className='attendees'><span>55</span> Attendees</div>
        <Card.Img variant="top" src="/pic-8.jpg" />
        <Card.Body>
          <Card.Title>Sed ut perspiciatis</Card.Title>
          <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>
          <div className='date-address'>
            <div className='address'>
              <img src={`/address-icon2.png`} alt={""} /> A-1, Envanto HQ
            </div>
            <div className='address date'>
              <img src={`/calendar-icon2.png`} alt={""} /> <span>30-04-2023</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EventCard