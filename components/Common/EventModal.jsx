import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import LoginPopup from './LoginPopup';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { attendEvent, getEvent, participateEvent } from '@/store/api/event';

const EventModal = (props) => {
  const auth = useAuth();
  const { event_details } = props;

  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const store = useSelector(store => store.event);
  useEffect(() => {
    if (event_details?.id) {
      dispatch(getEvent(event_details?.id))
    }
  }, [event_details?.id])

  const handleParticipate = async () => {
    dispatch(participateEvent(event_details?.id)).then(response => {

    }).catch(err => {

    })
  }

  const handleAttendEvent = async (status) => {
    dispatch(attendEvent(event_details?.id, status)).then(response => {

    }).catch(err => {

    })
  }
  const participate = () => {
    if (auth && auth.isAuthenticated) {
      if (auth?.user?.participants?.includes(event_details?.id)) {
        return (
          <>
            Attend Event :
            <button className='button-1' style={{ width: "80px" }} onClick={() => handleAttendEvent(2)} role='button'>Yes</button>
            <button className='button-1' style={{ width: "80px" }} onClick={() => handleAttendEvent(1)} role='button'>No</button>
          </>
        )
      } else if (auth?.user?.yes_attends?.includes(event_details?.id)) {
        return (
          <>
            Attend Event : Yes
          </>
        )
      } else if (auth?.user?.no_attends?.includes(event_details?.id)) {
        return (
          <>
            Attend Event : No
          </>
        )
      } else {
        return <button className='button-1' onClick={handleParticipate} role='button'>Participate</button>
      }
    } else {
      return <button className='button-1' onClick={() => { setModalShow(true) }} role='button'>participate</button>
    }
  }
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
            {/* <p>{JSON.parse(store || "")}</p> */}
            <p>{event_details?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className='date-address'>
              <div className='address'>
                <img src={`/address-icon2.png`} alt={event_details?.location} /> {event_details?.location}
              </div>
              <div className='address'>
                <img src={`/calendar-icon2.png`} alt={moment(event_details?.event_date).format('DD/MM/YYYY')} /> <span>{moment(new Date(event_details?.event_date)).format('DD/MM/YYYY')}</span>
              </div>
              <div className='address'>
                <img src={`/uder-icon.png`} alt={""} /> <span>{event_details?.participants} Participants</span>
              </div>
              <div className='button'>
                {participate()}
                {/* {
                  !auth.isAuthenticated ?
                    <button className='button-1' onClick={() => { setModalShow(true) }} role='button'>participate</button> :
                    <button className='button-1' onClick={handleParticipate} role='button'>Participate</button>
                } */}
              </div>
            </div>
          </Modal.Footer>
        </>}
      </Modal>

    </>
  )
}

export default EventModal