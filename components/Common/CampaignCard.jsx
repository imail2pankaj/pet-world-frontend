import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React from 'react'

const CampaignCard = ({ campaign }) => {
  return (
    <div>
     <Link href='#!'>
        <Card>
          <Card.Img variant="top" src="/pic-1.jpg" />
          <Card.Body>
            <Card.Title>Sed ut perspiciatis</Card.Title>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>              
            <div className='total-collection'>
              <span>$25,000.83 raised</span> of $50,000
              <ProgressBar now={60} />
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  )
}

export default CampaignCard