import Image from 'next/image'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React from 'react'
import Avatar from './Avatar';
import { formatCurrency } from '@/core/utils/format';

const CampaignCard = ({ campaign, is_paid = 0 }) => {
  const image = campaign?.media?.length ? campaign?.media[0].name : '/no-image.jpg';

  let badgeImage = "";
  if(parseInt(campaign?.paid) === 1) {
    badgeImage = "/paid-badge.png";
  }
  if(parseInt(campaign?.approved) !== 1) {
    badgeImage = "/not-approved-badge.png";
  }

  const reviewedBy = campaign?.approval?.map(approval => (
    (approval?.status === 1 || approval?.status === "1") ? <div key={approval.id} className='doctor'>
      <Link href={`/doctors/${approval?.doctor?.username}`}>
        <Avatar src={approval?.doctor?.profile_image} height={25} width={25} alt={approval?.doctor?.username} />
      </Link>
      <div className='do-name'>{approval?.doctor?.first_name} {approval?.doctor?.surname}</div>
    </div> : null
  ))

  return (
    <div className='card-main'>
      <Card>
        <div className='thumb'>
          <Link href={`/campaigns/${campaign?.slug}`}>
            <Card.Img variant="top" src={image} />
            <div className='badge'><img src={badgeImage} alt={""} /></div>
          </Link>
        </div>
        <Card.Body>
          <Link href={`/campaigns/${campaign?.slug}`}><Card.Title>{campaign?.title}</Card.Title></Link>
          {(campaign?.approved === 1 || campaign?.approved === "1") && <div className='aproved-by'>
            <span>Reviewed by :</span>
            {reviewedBy}
          </div>}
          <Card.Text>{campaign?.short_description}</Card.Text>
          <p style={{ color: "#7EB65C", fontSize: "14px", fontWeight: "bold" }}>Self Participation: {campaign?.pet_owner_participation}%</p>
          <div className='total-collection'>
            {/* <span>€25,000.83 raised</span> of {formatCurrency(campaign?.goal_amount)} */}
            <span>Fund Required</span> - {formatCurrency(campaign?.goal_amount)}
            <ProgressBar now={60} />
          </div>
        </Card.Body>
      </Card>

    </div>
  )
}

export default CampaignCard