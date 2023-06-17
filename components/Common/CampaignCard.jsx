import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React from 'react'

const CampaignCard = ({ campaign, is_paid = 0 }) => {
  const image = campaign?.media?.length ? campaign?.media[0].name : '/no-image.jpg';
  return (
    <div className='card-main'>
      <Card>
        <div className='thumb'>
          <Link href={`/campaigns/${campaign?.slug}`}>
            <Card.Img variant="top" src={image} />
            <div className='badge'><img src={is_paid == 0 ? `/not-approved-badge.png` : `/paid-badge.png`} alt={""} /></div>
          </Link>
        </div>
        <Card.Body>
          <Link href={`/campaigns/${campaign?.slug}`}><Card.Title>{campaign?.title}</Card.Title></Link>
          <div className='aproved-by'>
            <span>Voted by :</span>
            {
              campaign?.approval?.map(approval => (
                <div key={approval.id} className='doctor'>
                  <Link href={`/doctors/${approval?.doctor?.username}`}>
                    <Image src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}storage/users/${approval?.doctor?.profile_image}`} alt={approval?.doctor?.username} height={25} width={25} />
                  </Link>
                  <div className='do-name'>{approval?.doctor?.first_name} {approval?.doctor?.surname}</div>
                </div>
              ))
            }
          </div>
          <Card.Text>{campaign?.short_description}</Card.Text>

          <div className='total-collection'>
            <span>€25,000.83 raised</span> of €{campaign?.goal_amount}
            <ProgressBar now={60} />
          </div>
        </Card.Body>
      </Card>

    </div>
  )
}

export default CampaignCard