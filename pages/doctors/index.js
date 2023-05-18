import React from 'react'
import Containerer from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DoctorCard from '@/components/Common/DoctorCard';
import Pagination from 'react-bootstrap/Pagination';

const Doctors = () => {
  return (
    <div className='inner-main'>      
      <div className='header'>
      <div><img src={`/inner-bg1.jpg`} alt={"Header"} /></div>
        <h3>About Doctors</h3></div>      
    <Containerer fluid="xxl">  
    <div className='doctors-main'>
        <Row>
          <div className='process-main'>
            <Col sm={12} lg={6} className='pic'>
              <img src={`/donation-pic.jpg`} alt={"Doctor"} />
            </Col>
            <Col sm={12} lg={6} className='detail'>
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
                    <a className='next-process' href='#!' role='button'>
                      Campaign process <img src={`/next-arow.png`} alt={"Next"} />
                    </a>
                  </p>
                </div>              
            </Col>  
            <Col sm={12} lg={6} className='detail' style={{'display' : 'none'}}>
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
                <div className='step'>
                  <p>
                    <a className='next-process' href='#!' role='button'>
                    <img className='previuse' src={`/next-arow.png`} alt={"Next"} /> Appointment process
                    </a>
                  </p>
                </div>            
            </Col> 
          </div>         
        </Row>
        <Row>
          <div className='filter-main'>
            <Form>
                <Form.Group className="search-field" controlId="formBasicEmail">  
                  <Form.Control type="email" placeholder="Search doctor" />
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
        <Row xs={1} md={2} lg={3} xxl={4}>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
          </Col>
          <Col>
            <DoctorCard/> 
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

export default Doctors