import React from 'react'

const Statistics = ({statistics}) => {
  return (
    <div className='statistic-main' style={{backgroundImage:`url(/statestic-bg.svg)`}}>
      <div className='pic'><img src={`/statestic-img.png`} alt={"Pic"} /></div>
        <ul className='divider' style={{backgroundImage:`url(/paw-1.png)`}}>
          <li>
            <span>{statistics?.donations}</span>
            Donation
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>          
          <li>
            <span>{statistics?.doctors}</span>
            Doctors
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>
          <li>
            <span>{statistics?.campaigns}</span>
            Campaigns
            <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
          </li>
          <li>
            <span>{statistics?.donors}</span>
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