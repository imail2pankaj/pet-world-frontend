import React from 'react'
import Containerer from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WhyChoose = () => {
  return (
    <div className='why-choose-us'>
    <Containerer fluid="xxl">
      <Row>
        <h2 className='title'>Why Vet choose PetWorld</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/> tempor incididunt ut labore</p>
      </Row>
      <Row>
        <Col sm={4}>
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
        <Col sm={4}>
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
        <Col sm={4}>
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
        <Col sm={4}>
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
        <Col sm={4}>
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
        <Col sm={4}>
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
  )
}

export default WhyChoose