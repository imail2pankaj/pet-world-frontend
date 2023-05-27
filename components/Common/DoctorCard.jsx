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
      
        <Card>
          <div className='thumb'>
            <Link href='/doctors/doctor'><Card.Img variant="top" src="/pic-9.jpg" /></Link>
          </div>          
          <Card.Body>
          <Link href='/doctors/doctor'><Card.Title>Doctor&apos;s Name</Card.Title></Link>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>                          
          </Card.Body>
        </Card>
      
    </div>
  )
}

export default DoctorCard