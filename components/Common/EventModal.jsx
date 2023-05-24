import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EventModal = (props) => {
  return (
    <Modal {...props} dialogClassName="event-popup" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Button onClick={props.onHide}><img src={`/close.png`} alt={""} /></Button>
        <div className='thumb'>
          <img src={`/pic-1.jpg`} alt={""} />
        </div>
        <h4>Sed ut perspiciatis</h4>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged recently with desktop publishing software.</p>
      </Modal.Body>
      <Modal.Footer>
        <div className='date-address'>
          <div className='address'>
            <img src={`/address-icon2.png`} alt={""} /> A-1, Envanto HQ Envanto HQ Envanto HQ
          </div>
          <div className='address'>
            <img src={`/calendar-icon2.png`} alt={""} /> <span>30-04-2023</span>
          </div>
          <div className='address'>
            <img src={`/uder-icon.png`} alt={""} /> <span>256 Participants</span>
          </div>
          <div className='button'>
            <a className='button-1' href='#!' role='button'>participate</a>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default EventModal