import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CampaignCard, DoctorAppointed, ReportDoctorModal, WhyVetChoosePetWorld } from '@/components/Common';
import Link from 'next/link';
import axiosInstance from '@/store/api/axiosInstance';
import { defaultAvatar } from '@/core/utils/constants';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';

const DoctorsProfile = ({ doctor }) => {

  const [modalShow, setModalShow] = useState(false);
  const { user, isAuthenticated } = useAuth();

  let openGraph = { images: [] };

  if (doctor) {
    openGraph = {
      ...doctor,
      title: `${doctor?.first_name} ${doctor?.surname} ${doctor?.last_name}`,
      description: doctor?.detail?.bio,
      images: [{ url: doctor?.profile_image }]
    };
  }
  if (doctor) {
    // console.log(
    //   doctor?.detail?.specialities?.length > 0 ? doctor?.detail?.specialities.join(", ") : "N/A",
    //   doctor?.detail?.specialities?.length,
    //   typeof doctor?.detail?.specialities
    // )
    console.log(typeof doctor?.detail?.specialities === 'string' ? JSON.parse(doctor?.detail?.specialities) : doctor?.detail?.specialities);
  }
  return (
    <>
      <NextSeo
        title={`${doctor?.first_name} ${doctor?.surname} ${doctor?.last_name}`}
        description={doctor?.detail?.bio}
        openGraph={openGraph}
      />
      <div className='doctors-profile'>
        <div className='profile-section'>
          <div className='graphic-1'><img src={`/paper-plan2.png`} alt={""} /></div>
          <div className='graphic-2'><img src={`/paw-2.png`} alt={""} /></div>
          <Container fluid="xxl">
            <Row className="justify-content-center">
              <div className='profile-pic'>
                <div className='thumb'>
                  <img src={doctor?.profile_image ? doctor?.profile_image : defaultAvatar} alt={"Profile Picture"} />
                </div>
                {doctor?.detail?.is_appointed == 1 && <DoctorAppointed />}
              </div>
              <div className='profile-details'>
                <h2 className='title'>
                  <span>My name is</span>
                  {doctor?.first_name} {doctor?.surname} {doctor?.last_name}
                </h2>
                <p>{doctor?.detail?.bio}</p>
                {/* <span className='bullet-point'>
                  <img src={`/bullet.png`} alt={""} /> Unique identification number
                </span> */}
                <span className='bullet-point'>
                  <img src={`/bullet.png`} alt={""} /> Education qualification: {doctor?.detail?.qualifications}
                </span>
                <span className='bullet-point'>
                  <img src={`/bullet.png`} alt={""} /> Specialties: {doctor?.detail?.specialities ? (typeof doctor?.detail?.specialities === 'string' ? JSON.parse(doctor?.detail?.specialities) : doctor?.detail?.specialities).join(', ') : "N/A"}
                </span>
                <div className='score'>
                  <p>Launched campaigns :<br />
                    Total amount collected :
                  </p>
                  <p className='secound'>{doctor?.campaigns?.length}<br />
                    $25,000.83
                  </p>
                </div>
                <div className='d-flex align-items-center'>
                  {
                    user?.reports?.includes(doctor?.id) ?
                      <Button className='button-1' role='button'>Reported</Button> :
                      <Button onClick={() => setModalShow(true)} className='button-1' role='button'>Report</Button>
                  }
                  <ReportDoctorModal doctor={doctor} show={modalShow} onHide={() => setModalShow(false)} />
                  <div className='ps-4 '>
                    {doctor?.detail?.facebook && <Link href={doctor?.detail?.facebook}><Image className='me-2' src={'/fb-icon.png'} alt="facebook" width="30" height="30" /></Link>}
                    {doctor?.detail?.instagram && <Link href={doctor?.detail?.instagram}><Image className='me-2' src={'/insta-icon.png'} alt="instagram" width="30" height="30" /></Link>}
                    {doctor?.detail?.twitter && <Link href={doctor?.detail?.twitter}><Image className='me-2' src={'/tw-icon.png'} alt="twitter" width="30" height="30" /></Link>}
                    {doctor?.detail?.linkedin && <Link href={doctor?.detail?.linkedin}><Image className='me-2' src={'/in-icon.png'} alt="linkedin" width="30" height="30" /></Link>}
                  </div>
                </div>
              </div>
            </Row>
            <Row className="justify-content-center">
              <div className='addres-phone'>
                <div className='email'><img src={`/email-icon.png`} alt={""} />
                  <h3>Email</h3>
                  <span>{doctor?.email || "N/A"}</span>
                </div>
                <div className='email phone'><img src={`/phone-icon.png`} alt={""} />
                  <h3>Call</h3>
                  <span>{doctor?.phone || "N/A"}</span>
                </div>
                <div className='email address'><img src={`/address-icon.png`} alt={""} />
                  <h3>Address</h3>
                  <span>{doctor?.address || "N/A"}</span>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        {
          doctor?.campaigns?.length ?
            <Container fluid="xxl">
              <div className='doctor-campaigns'>
                <Row className="justify-content-md-center">
                  <h2 className='title'>
                    <span>My</span>
                    Campaign
                  </h2>
                  {
                    doctor?.campaigns?.map((campaign, index) => (
                      <CampaignCard campaign={campaign} key={index} is_paid={(index % 2) / 0} />
                    ))
                  }
                </Row>
                <Row className="justify-content-center">
                  <Link className='button-1' href='/campaigns' role='button'>See more</Link>
                </Row>
              </div>

            </Container> : null
        }

        <WhyVetChoosePetWorld />

      </div >
    </>
  )
}

export default DoctorsProfile

export async function getServerSideProps({ params }) {
  // Call external API from here directly
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${params.slug}`);

  return {
    props: { doctor: response?.data }
  }
}