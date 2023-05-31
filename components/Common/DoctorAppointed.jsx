import React from 'react'

const DoctorAppointed = () => {
  return (
    <>
      <div className='approved-doc'>
        <div className='icon'><img src={`/approved-doc-icon.png`} alt={"Approved Doctor"} /></div>
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
    </>
  )
}

export default DoctorAppointed