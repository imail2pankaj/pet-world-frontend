import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import LoginPopup from './LoginPopup';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { attendEvent, getEvent, participateEvent } from '@/store/api/event';

const EventModal = (props) => {
  const auth = useAuth();
  const { event_details } = props;

  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { eventData } = useSelector(store => store.event);

  useEffect(() => {
    if (event_details?.id) {
      dispatch(getEvent(event_details?.id))
    }
  }, [event_details?.id])

  const handleParticipate = async () => {
    setLoading(true);
    dispatch(participateEvent(event_details?.id)).then(() => {
      dispatch(getEvent(event_details?.id)).then(() => {
        auth.authMe();
        setLoading(false);
      })
    })
  }

  const handleAttendEvent = async (status) => {
    setLoading(true);
    dispatch(attendEvent({ id: event_details?.id, status })).then(() => {
      dispatch(getEvent(event_details?.id)).then(() => {
        auth.authMe();
        setLoading(false);
      })
    })
  }
  const participate = () => {
    if (auth && auth.isAuthenticated) {
      if (auth?.user?.participants?.includes(eventData?.id)) {
        return (
          <>
            Attend Event:
            {
              loading ? <Spinner /> : (
                <>
                  <button className='button-1' style={{ width: "80px" }} onClick={() => handleAttendEvent(2)} role='button'>Yes</button>
                  <button className='button-1' style={{ width: "80px" }} onClick={() => handleAttendEvent(1)} role='button'>No</button>
                </>
              )
            }
          </>
        )
      } else if (auth?.user?.yes_attends?.includes(eventData?.id)) {
        return <>Attend : Yes</>
      } else if (auth?.user?.no_attends?.includes(eventData?.id)) {
        return <>Attend : No</>
      } else {
        return loading ? <Spinner /> : (<button className='button-1' onClick={handleParticipate} role='button'>Participate</button>)
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
              <img src={eventData?.event_image} alt={""} />
            </div>
            <h4>{eventData?.title}</h4>
            <p>{eventData?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className='date-address'>
              <div className='address'>
                <img src={`/address-icon2.png`} alt={eventData?.location} /> {eventData?.location}
              </div>
              <div className='address'>
                <img src={`/calendar-icon2.png`} alt={moment(eventData?.event_date).format('DD/MM/YYYY')} /> <span>{moment(new Date(eventData?.event_date)).format('DD/MM/YYYY')}</span>
              </div>
              <div className='address'>
                <img src={`/uder-icon.png`} alt={""} /> <span>{eventData?.participants} Participants</span>
              </div>
              <div className='button'>
                {participate()}
              </div>
            </div>
          </Modal.Footer>
        </>}
      </Modal>

    </>
  )
}

export default EventModal