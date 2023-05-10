import React from 'react'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';


const EventCard = () => {
  return (
    <div>
      <Link href='#!'>
        <Card>
          <Card.Img variant="top" src="/pic-8.jpg" />
          <Card.Body>
            <Card.Title>Sed ut perspiciatis</Card.Title>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>            
          </Card.Body>
        </Card>
    </Link>
</div>
  )
}

export default EventCard