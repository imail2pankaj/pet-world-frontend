import React from 'react'

const Statistics = () => {
  return (
    <div className='statistic-main' style={{backgroundImage:`url(/statestic-bg.svg)`}}>
      <div className='pic'><img src={`/statestic-img.png`} alt={"Pic"} /></div>
        <ul className='divider' style={{backgroundImage:`url(/paw-1.png)`}}>
          <li>
            <span>$13m+</span>
            Donation
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>          
          <li>
            <span>100+</span>
            Doctors
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>
          <li>
            <span>185+</span>
            Campaigns
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>
          <li>
            <span>15k+</span>
            Donors
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>
          <li>
            <span>10k+</span>
            Pets saved
          </li>
        </ul>
    </div>
  )
}

export default Statistics