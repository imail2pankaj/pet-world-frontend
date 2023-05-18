import React, { useState } from 'react'
import Containerer from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import EventCard from '@/components/Common/EventCard';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Events = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className='inner-main'>      
      <div className='header'>
      <div><img src={`/event-bg.jpg`} alt={"Header"} /></div>
        <h3>Events</h3></div>      
    <Containerer fluid="xxl">  
    <div className='doctors-main events-main'>        
        <Row>
          <div className='filter-main'>
            <Form>
                <Form.Group className="search-field" controlId="formBasicEmail">  
                  <Form.Control type="email" placeholder="Search Event" />
                </Form.Group>
                <Form.Group className="search-field date-pick" controlId="DatePicker">  
                  <Form.Control type="email" placeholder="Search date" />
                </Form.Group>
              </Form>

              <div className='filter'>                
                <DropdownButton id="dropdown-item-button" title="Filter">                
                <Dropdown.Item as="button">Option 1</Dropdown.Item>
                <Dropdown.Item as="button">Option 2</Dropdown.Item>
                <Dropdown.Item as="button">Option 3</Dropdown.Item>
              </DropdownButton>
              </div>
            </div>            
        </Row>    

        <div className='doctor-list'>
        <Row xs={1} md={2} lg={4}>
          <Col>
            <EventCard handelmodel={setModalShow}/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col><Col>
            <EventCard/> 
          </Col>
          <Col>
            <EventCard/> 
          </Col>
          </Row>
          <Row>
          <Pagination className="justify-content-center mt-4">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{8}</Pagination.Item>
            <Pagination.Item>{9}</Pagination.Item>
            <Pagination.Item>{10}</Pagination.Item>                                
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
          </Row>

          <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>

        </div>
    </div>      
    </Containerer>
    
    <div className='why-choose-us'>
    <Containerer fluid="xxl">
      <Row>
        <h2 className='title'>Why Vet choose PetWorld</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/> tempor incididunt ut labore</p>
      </Row>
      <Row>
        <Col sm={6} lg={4}>
        <div className='icon'>
          <img src={`/icon1.svg`} alt={"Icon"} />
        </div>
        <h3>
          Sed ut perspiciatis
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
        </p>
        </Col>
        <Col sm={6} lg={4}>
        <div className='icon'>
          <img src={`/icon2.svg`} alt={"Icon"} />
        </div>
        <h3>
          Sed ut perspiciatis
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
        </p>
        </Col>
        <Col sm={6} lg={4}>
        <div className='icon'>
          <img src={`/icon3.svg`} alt={"Icon"} />
        </div>
        <h3>
          Sed ut perspiciatis
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
        </p>
        </Col>
        <Col sm={6} lg={4}>
        <div className='icon'>
          <img src={`/icon4.svg`} alt={"Icon"} />
        </div>
        <h3>
          Sed ut perspiciatis
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
        </p>
        </Col>
        <Col sm={6} lg={4}>
        <div className='icon'>
          <img src={`/icon5.svg`} alt={"Icon"} />
        </div>
        <h3>
          Sed ut perspiciatis
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
        </p>
        </Col>
        <Col sm={6} lg={4}>
        <div className='icon'>
          <img src={`/icon6.svg`} alt={"Icon"} />
        </div>
        <h3>
          Sed ut perspiciatis
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
        </p>
        </Col>
      </Row>
    </Containerer>      
    </div>
    </div>
     
  )
}


function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg"  aria-labelledby="contained-modal-title-vcenter" centered className='event-popup'>        
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
  );
}

export default Events