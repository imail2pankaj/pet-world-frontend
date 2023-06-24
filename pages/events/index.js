import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Spinner } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');

import { EventCard, PageHeader, EventModal, WhyVetChoosePetWorld } from '@/components/Common';
import axiosInstance from '@/store/api/axiosInstance';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Loader from '@/components/Common/Loader';
import CustomPagination from '@/components/Common/CustomPagination';
import { capitalize } from '@/core/utils/format';
import { NextSeo } from 'next-seo';

const Events = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState("");
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);
  const [eventDetails, setEventDetails] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");

  const fetchEvents = async () => {
    setLoading(true)
    const params = {
      sort: sortBy,
      page: currentPage,
      per_page: dataPerPage,
      q: query,
      date: startDate ? moment(startDate).format('YYYY-MM-DD') : ""
    }
    axiosInstance.get('/events?' + (new URLSearchParams(params))).
      then(response => {
        setLoading(false);
        setEvents(response.data || []);
      });
  }
  // useEffect(() => {
  //   setEvents(initialEvents);
  // }, [])

  useEffect(() => {
    fetchEvents()
  }, [query, startDate, currentPage, dataPerPage, sortBy])

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleDateChange = (date) => {
    setStartDate(date)
  }

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = events.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NextSeo title={'Events'} />
      <div className='inner-main'>
        <PageHeader banner={`/event-bg.jpg`} title={'Events'} />
        <Container fluid="xxl">
          <div className='doctors-main events-main'>
            <Row>
              <div className='filter-main'>
                <Form>
                  <Form.Group className="search-field" controlId="formBasicEmail">
                    <Form.Control type="text" onChange={handleChange} placeholder="Search Event" />
                  </Form.Group>
                  <Form.Group className="search-field date-pick" controlId="DatePicker">
                    <DatePicker className='form-control' isClearable dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => handleDateChange(date)} />
                  </Form.Group>
                </Form>

                <div className='filter'>
                  <DropdownButton id="dropdown-item-button" title={`Sort By:  ${capitalize(sortBy)}`}>
                    <Dropdown.Item onClick={() => setSortBy('a-z')} as="button">A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy('z-a')} as="button">Z-A</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy('latest')} as="button">Latest</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy('oldest')} as="button">Oldest</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </Row>

            <div className='doctor-list'>
              <Row xs={1} md={2} lg={3} xxl={4}>
                {(!loading && events) && events.map(item =>
                  <Col key={item.id}>
                    <EventCard handleModal={setModalShow} handleEventDetails={setEventDetails} event={item} />
                  </Col>
                )}
              </Row>
              <div className='d-block text-center'>
                {loading && <Spinner />}
                {!loading && events.length === 0 ? "No Events Found" : ""}
              </div>
              {events.length ?
                <Row>
                  <CustomPagination
                    dataPerPage={dataPerPage}
                    totalData={events.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </Row> : null}

              <EventModal event_details={eventDetails} show={modalShow} onHide={() => setModalShow(false)} />

            </div>
          </div>
        </Container>
        <WhyVetChoosePetWorld />
      </div>
    </>
  )
}

export default Events


export async function getStaticProps({ locale }) {
  // const events = await axiosInstance.get('events');

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      // initialEvents: []
      // initialEvents: events?.data
      // Will be passed to the page component as props
    },
    revalidate: 100,
  }
}