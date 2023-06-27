import { PageHeader, WhyVetChoosePetWorld } from '@/components/Common'
import React from 'react'

const BecomeASubscriber = () => {
  return (
    <div className='inner-main'>
      <PageHeader banner={"/aboutus-bg.jpg"} title={'Become A Donator'} />
      Become A Subscriber
      <WhyVetChoosePetWorld />
    </div>
  )
}

export default BecomeASubscriber