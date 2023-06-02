import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CampaignCard, DoctorAppointed, WhyVetChoosePetWorld } from '@/components/Common';
import Link from 'next/link';
import axiosInstance from '@/store/api/axiosInstance';

const DoctorsProfile = ({ doctor }) => {

  return (
    <div className='doctors-profile'>
      <div className='profile-section'>
        <div className='graphic-1'><img src={`/paper-plan2.png`} alt={""} /></div>
        <div className='graphic-2'><img src={`/paw-2.png`} alt={""} /></div>
        <Container fluid="xxl">
          <Row className="justify-content-center">
            <div className='profile-pic'>
              <img src={doctor?.profile_image ? doctor?.profile_image : `/profile-pic.png`} alt={"Profile Picture"} />
              <DoctorAppointed />
            </div>
            <div className='profile-details'>
              <h2 className='title'>
                <span>My name is</span>
                {doctor?.first_name} {doctor?.last_name}
              </h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text when an unknown. </p>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Doctor&apos;s unique identification number
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Doctor&apos;s Education qualification
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Doctor&apos;s Specialties
              </span>
              <div className='score'>
                <p>Launched campaigns :<br />
                  Total amount collected :
                </p>
                <p className='secound'>8<br />
                  $25,000.83
                </p>
              </div>
              <Link className='button-1' href='#!' role='button'>
                Report
              </Link>
            </div>
          </Row>
          <Row className="justify-content-center">
            <div className='addres-phone'>
              <div className='email'><img src={`/email-icon.png`} alt={""} />
                <h3>Email</h3>
                <span>{doctor?.email}</span>
              </div>
              <div className='email phone'><img src={`/phone-icon.png`} alt={""} />
                <h3>Call</h3>
                <span>{doctor?.phone}</span>
              </div>
              <div className='email address'><img src={`/address-icon.png`} alt={""} />
                <h3>Address</h3>
                <span>{doctor?.address}</span>
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
            <Link className='button-1' href='/campaigns' role='button'>See more</Link>
          </Row>
        </div>

      </Container>

      <WhyVetChoosePetWorld />

    </div>
  )
}

export default DoctorsProfile

export async function getServerSideProps({ params }) {
  // Call external API from here directly
  const response = await axiosInstance.get(`/doctors/${params.slug}`);

  return {
    props: { doctor: response?.data }
  }
}