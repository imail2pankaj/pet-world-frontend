import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => {
  return (
    <div className='about-main'>        
        <Row>
          <Col sm={6}>
            <h2 className='title'>
              <span>About</span>
              PetWorld
            </h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con sequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
            <span className='bullet-point'>
              <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor amet consectetur adipiscing.
            </span>
            <span className='bullet-point'>
              <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor sit sed do eiusmod tempor.
            </span>
            <span className='bullet-point'>
              <img src={`/bullet.png`} alt={""} /> Lorem ipsum consectetur adipiscing elit tempor.
            </span>
            <a className='button-1' href='#!' role='button'>
               Read More
            </a>
          </Col>
          <Col>
            <img src={`/about-pic.png`} alt={"About Pic"} />
          </Col>
        </Row>
    </div>
  )
}

export default About