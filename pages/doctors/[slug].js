import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CampaignCard, WhyVetChoosePetWorld } from '@/components/Common';

const DoctorsProfile = () => {
  return (
    <div className='doctors-profile'>
      <div className='profile-section'>
        <div className='graphic-1'><img src={`/paper-plan2.png`} alt={""} /></div>
        <div className='graphic-2'><img src={`/paw-2.png`} alt={""} /></div>
        <Container fluid="xxl">
          <Row className="justify-content-center">
            <div className='profile-pic'>
              <img src={`/profile-pic.png`} alt={"Profile Picture"} />
              <div className='approved-doc'>
                <div className='icon'><img src={`/approved-doc-icon.png`} alt={"Aproved Doctor"} /></div>
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
            </div>
            <div className='profile-details'>
              <h2 className='title'>
                <span>My name is</span>
                Dr. Juli Doe
              </h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown. </p>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Doctor's unique identification number
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Doctor’s Education qualification
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Doctor’s Specialties
              </span>
              <div className='score'>
                <p>Launched campaigns :<br />
                  Total amount collected :
                </p>
                <p className='secound'>8<br />
                  $25,000.83
                </p>
              </div>
              <a className='button-1' href='#!' role='button'>
                Report
              </a>
            </div>
          </Row>
          <Row className="justify-content-center">
            <div className='addres-phone'>
              <div className='email'><img src={`/email-icon.png`} alt={""} />
                <h3>Email</h3>
                <span>info@petworld.com</span>
              </div>
              <div className='email phone'><img src={`/phone-icon.png`} alt={""} />
                <h3>Call</h3>
                <span>(0)123456789</span>
              </div>
              <div className='email address'><img src={`/address-icon.png`} alt={""} />
                <h3>Address</h3>
                <span>A-1, Envanto HQ, Bulgaria.</span>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <Container fluid="xxl">
        <div className='doctor-campaigns'>
          <Row className="justify-content-md-center">
            <h2 className='title'>
              <span>My</span>
              Campaign
            </h2>
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
          </Row>
          <Row className="justify-content-center">
            <a className='button-1' href='/campaigns' role='button'>See more</a>
          </Row>
        </div>

      </Container>

      <WhyVetChoosePetWorld />

    </div>
  )
}

export default DoctorsProfile