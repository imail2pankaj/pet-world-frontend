import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React from 'react'

const CampaignCard = ({ campaign }) => {
  return (
    <div className='card-main'>
        <Card>
        <Link href='/campaigns/Campaign'><Card.Img variant="top" src="/pic-1.jpg" /></Link>
          <Card.Body>
          <Link href='/campaigns/Campaign'><Card.Title>Sed ut perspiciatis</Card.Title></Link>
          <div className='aproved-by'> 
            <span>Voted by :</span>
              <div className='doctor'>
                <Link href='#!'>
                  <img src={`/donor-pic.jpg`} alt={""} />
                </Link>
                <div className='do-name'>Doctor's name</div>
              </div>
              <div className='doctor'>
                <Link href='#!'>
                  <img src={`/donor-pic.jpg`} alt={""} />
                </Link>
                <div className='do-name'>Doctor's name</div>
              </div>
              <div className='doctor'>
                <Link href='#!'>
                  <img src={`/donor-pic.jpg`} alt={""} />
                </Link>
                <div className='do-name'>Doctor's name</div>
              </div>
            </div>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>              
            
            <div className='total-collection'>
              <span>$25,000.83 raised</span> of $50,000
              <ProgressBar now={60} />
            </div>
          </Card.Body>
        </Card>
      
    </div>
  )
}

export default CampaignCard