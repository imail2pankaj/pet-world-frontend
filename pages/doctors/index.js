import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Spinner } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import { WhyVetChoosePetWorld, DoctorCard, PageHeader } from '@/components/Common';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosInstance from '@/store/api/axiosInstance';
import { capitalize } from '@/core/utils/format';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

const Doctors = () => {

  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [sortBy, setSortBy] = useState("Latest");

  const fetchDoctors = async () => {
    setLoading(true)
    const params = {
      sort: sortBy,
      // page: currentPage,
      // per_page: dataPerPage,
      q: query
    }
    axiosInstance.get('/doctors?' + (new URLSearchParams(params))).
      then(response => {
        setLoading(false);
        setDoctors(response.data || []);
      });
  }

  // useEffect(() => {
  //   setDoctors(initialDoctors);
  // }, [])

  useEffect(() => {
    fetchDoctors()
  }, [query, sortBy])

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className='inner-main'>
      <NextSeo title={'About Doctors'} />
      <PageHeader banner={`/inner-bg1.jpg`} title={"About Doctors"} />
      <Container fluid="xxl">
        <div className='doctors-main'>
          <Row>
            <div className='process-main'>
              <Col sm={12} lg={6} className='pic'>
                <img src={`/donation-pic.jpg`} alt={"Doctor"} />
              </Col>
              {/* <Col sm={12} lg={6} className='detail'>
                <h2 className='title'>
                  <span>Easy Appointment</span>
                  Process for doctors
                </h2>
                <p>Register on the website, create campaigns, upload documents, get verified and donations can start.</p>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#7EB65C' }}> 01.</span>
                    Register as a doctor
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
                </div>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#FF7F18' }}> 02.</span>
                    Apply for appointment
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
                </div>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#9E0C0F' }}> 03.</span>
                    Verify by moderator
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
                </div>
                <div className='step'>
                  <p>
                    <Link className='next-process' href='#!' role='button'>
                      Campaign process <img src={`/next-arow.png`} alt={"Next"} />
                    </Link>
                  </p>
                </div>
              </Col> */}
              <Col sm={12} lg={6} className='detail' >
                <h2 className='title'>
                  <span>Easy Campaign</span>
                  Process for doctors
                </h2>
                <p>Register on the website, create campaigns, upload documents, get verified and donations can start.</p>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#7EB65C' }}> 01.</span>
                    Apply to be appointed
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
                </div>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#FF7F18' }}> 02.</span>
                    Review application by other doctors
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
                </div>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#9E0C0F' }}> 03.</span>
                    If approved review campaigns
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
                </div>
                <div className='step'>
                  <h3 className='title'>
                    <span style={{ color: '#0096EB' }}> 04.</span>
                    Get paid for your efforts
                  </h3>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
                </div>
                {/* <div className='step'>
                  <p>
                    <Link className='next-process' href='#!' role='button'>
                      <img className='previuse' src={`/next-arow.png`} alt={"Next"} /> Appointment process
                    </Link>
                  </p>
                </div> */}
              </Col>
            </div>
          </Row>
          <Row>
            <div className='filter-main'>
              <Form>
                <Form.Group className="search-field" controlId="formBasicEmail">
                  <Form.Control type="text" onChange={handleChange} placeholder="Search Doctors" />
                </Form.Group>
              </Form>

              <div className='filter'>
                <DropdownButton id="dropdown-item-button" title={`Sort By:  ${t(capitalize(sortBy))}`}>
                  <Dropdown.Item onClick={() => setSortBy('a-z')} as="button">A-Z</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('z-a')} as="button">Z-A</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('latest')} as="button">{t("Latest")}</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('oldest')} as="button">{t("Oldest")}</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </Row>

          <div className='doctor-list'>
            <Row xs={1} md={2} lg={3} xxl={4}>
              {(!loading && doctors) && doctors.map(item =>
                <Col key={item.id}>
                  <DoctorCard doctor={item} />
                </Col>
              )}
            </Row>
            <div className='d-block text-center'>
              {loading && <Spinner />}
              {!loading && doctors.length === 0 ? "No doctors Found" : ""}
            </div>
            <Row>
              <Pagination className="justify-content-center mt-4">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{8}</Pagination.Item>
                <Pagination.Item>{9}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Row>
          </div>
        </div>
      </Container >

      <WhyVetChoosePetWorld />
    </div >
  )
}

export default Doctors



export async function getStaticProps({ locale }) {
  // const doctors = await axiosInstance.get('doctors');

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      // initialDoctors: doctors?.data || []
      // Will be passed to the page component as props
    },
    revalidate: 100,
  }
}

// export async function getStaticPaths() {
//   const doctors = await axiosInstance.get('doctors');
 
//   // Get the paths we want to pre-render based on posts
//   const paths = doctors?.data.map((doctor) => ({
//     params: { id: doctor.username },
//   }));
 
//   // We'll pre-render only these paths at build time.
//   // { fallback: 'blocking' } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: 'blocking' };
// }