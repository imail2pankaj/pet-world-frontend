import moment from 'moment';
import Image from 'next/image';
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EventModal = (props) => {
  const {eventDetails} = props;
  return (
    <Modal {...props} dialogClassName="event-popup" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Button onClick={props.onHide}><img src={`/close.png`} alt={""} /></Button>
        <div className='thumb'>
          <img src={eventDetails?.event_image} alt={""} />
        </div>
        <h4>{eventDetails?.title}</h4>
        <p>{eventDetails?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className='date-address'>
          <div className='address'>
            <img src={`/address-icon2.png`} alt={eventDetails?.location} /> {eventDetails?.location}
          </div>
          <div className='address'>
            <img src={`/calendar-icon2.png`} alt={moment(eventDetails?.event_date).format('DD/MM/YYYY')} /> <span>{moment(eventDetails?.event_date).format('DD/MM/YYYY')}</span>
          </div>
          <div className='address'>
            <img src={`/uder-icon.png`} alt={""} /> <span>256 Participants</span>
          </div>
          <div className='button'>
            <a className='button-1' href='/' role='button'>participate</a>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default EventModal