import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import React from 'react'
import { DoctorAppointed } from '.';


const DoctorCard = ({doctor}) => {
  return (
    <div className='item'>
        {doctor?.appointed == 1 && <DoctorAppointed />}
      
        <Card>
          <div className='thumb'>
            <Link href={`/doctors/${doctor.username}`}><Card.Img variant="top" src={doctor.profile_image} /></Link>
          </div>          
          <Card.Body>
          <Link href={`/doctors/${doctor.username}`}><Card.Title>Dr. {doctor.first_name}{` `}{doctor.last_name}</Card.Title></Link>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia...</Card.Text>                          
          </Card.Body>
        </Card>
      
    </div>
  )
}

export default DoctorCard