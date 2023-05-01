import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CampaignCard = ({ campaign }) => {
  return (
    <div>
      <Image src={campaign.image} width={150} height={30} alt={campaign.title} />
      <Link href={`/campaigns/${campaign.id}`}>CampaignCard {campaign.title} </Link>
      {campaign.description}
      {campaign.goal_amount}
      {campaign.raised_amount}
    </div>
  )
}

export default CampaignCard