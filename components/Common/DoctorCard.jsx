import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import React from 'react'


const DoctorCard = () => {
  return (
    <div className='item'>
      <div className='approved-doc'>
          <div className='icon'><img src={`/approved-doc-icon.png`} alt={"Aproved Doctor"} /></div>
          <div className='doctor-detail'>
            <h4>Highest level of donors protection</h4>
            <span className='bullet-point'>
              <img src={`/bullet2.png`} alt={""} /> Member of Trust & Safety Club
            </span>
            <span className='bullet-point'>
              <img src={`/bullet2.png`} alt={""} /> Funds are raised only on PetWorld
            </span>
            <span className='bullet-point'>
              <img src={`/bullet2.png`} alt={""} /> Beneficiary is verified
            </span>
            <span className='bullet-point'>
              <img src={`/bullet2.png`} alt={""} /> Documentation is checked
            </span>
            <span className='bullet-point'>
              <img src={`/bullet2.png`} alt={""} /> Donations are protected by 128-bit encryption
            </span>
          </div>
      </div>
      <Link href='#!'>
        <Card>          
          <Card.Img variant="top" src="/pic-1.jpg" />
          <Card.Body>
            <Card.Title>Sed ut perspiciatis</Card.Title>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>                          
          </Card.Body>
        </Card>
      </Link>
    </div>
  )
}

export default DoctorCard