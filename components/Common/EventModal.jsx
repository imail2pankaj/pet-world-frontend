import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import LoginPopup from './LoginPopup';
import { useAuth } from '@/hooks/useAuth';

const EventModal = (props) => {
  const auth = useAuth();
  const { event_details } = props;

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Modal {...props} dialogClassName="event-popup" aria-labelledby="contained-modal-title-vcenter" centered>
        {(!auth.isAuthenticated && modalShow) && <LoginPopup show={modalShow} hideLogin={setModalShow} event_details={event_details} onHide={() => setModalShow(false)} />}
        {(!modalShow) && <>
          <Modal.Body>
            <Button onClick={props.onHide}><img src={`/close.png`} alt={""} /></Button>
            <div className='thumb'>
              <img src={event_details?.event_image} alt={""} />
            </div>
            <h4>{event_details?.title}</h4>
            <p>{event_details?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className='date-address'>
              <div className='address'>
                <img src={`/address-icon2.png`} alt={event_details?.location} /> {event_details?.location}
              </div>
              <div className='address'>
                <img src={`/calendar-icon2.png`} alt={moment(event_details?.event_date).format('DD/MM/YYYY')} /> <span>{moment(event_details?.event_date).format('DD/MM/YYYY')}</span>
              </div>
              <div className='address'>
                <img src={`/uder-icon.png`} alt={""} /> <span>{event_details?.participants} Participants</span>
              </div>
              <div className='button'>
                {
                  !auth.isAuthenticated ?
                    <button className='button-1' href="#" onClick={() => { setModalShow(true) }} role='button'>participate</button> :
                    <button className='button-1' role='button'>Participate</button>
                }
              </div>
            </div>
          </Modal.Footer>
        </>}
      </Modal>

    </>
  )
}

export default EventModal