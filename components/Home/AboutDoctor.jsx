import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AboutDoctor = () => {
  return (
    <div className='about-doctor-main'>  
    <div className='graphic-1'><img src={`/doctor-icon.png`} alt={""} /></div>     
    <div className='graphic-2'><img src={`/paw-2.png`} alt={""} /></div>     
      <Row>
          <Col sm={12} lg={7}className='doctor-pic'>
            <img src={`/about-doctor-pic.png`} alt={"About Pic"} />
          </Col>
          <Col className='doc-content'>
            <h2 className='title'>
              <span>About</span>
              The Doctors
            </h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con sequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con sequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>            
            <a className='button-1' href='#!' role='button'>
               Read More
            </a>
          </Col>          
        </Row>
    </div>
  )
}

export default AboutDoctor