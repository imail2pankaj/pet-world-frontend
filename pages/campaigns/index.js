import CampaignCard from '@/components/Common/CampaignCard';
import React from 'react'

const campaigns = [
  {
    id: 1,
    title: 'Title 1',
    image: '/logo-en.png',
    description: 'Desc 1',
    goal_amount: '50000',
    raised_amount: '25000',
  },
  {
    id: 2,
    title: 'Title 2',
    image: '/logo-en.png',
    description: 'Desc 2',
    goal_amount: '50000',
    raised_amount: '25000',
  },
  {
    id: 3,
    title: 'Title 3',
    image: '/logo-en.png',
    description: 'Desc 3',
    goal_amount: '50000',
    raised_amount: '25000',
  },
  {
    id: 4,
    title: 'Title 4',
    image: '/logo-en.png',
    description: 'Desc 4',
    goal_amount: '50000',
    raised_amount: '25000',
  },
];

const Campaigns = () => {
  return (
    <div>
      Campaigns
      {campaigns.map(campaign => <CampaignCard campaign={campaign} key={campaign.id} />)}
    </div>
  )
}

export default Campaigns