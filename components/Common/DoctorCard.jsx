import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import React from 'react'
import { DoctorAppointed } from '.';
import { defaultAvatar } from '@/core/utils/constants';
import { truncate } from '@/core/utils/format';


const DoctorCard = ({ doctor }) => {
  return (
    <div className='item'>
      {doctor?.detail?.is_appointed == 1 && <DoctorAppointed />}
      <Card>
        <div className='thumb'>
          <Link href={`/doctors/${doctor.username}`}><Card.Img variant="top" src={doctor.profile_image || defaultAvatar} /></Link>
        </div>
        <Card.Body>
          <Link href={`/doctors/${doctor.username}`}><Card.Title>{doctor.first_name} {doctor.surname} {doctor.last_name}</Card.Title></Link>
          <Card.Text>{truncate(doctor?.detail?.bio || "")}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default DoctorCard