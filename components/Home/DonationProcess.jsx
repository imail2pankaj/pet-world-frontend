import React from 'react'
import Containerer from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DonationProcess = () => {
  return (
    <div className='donation-process'> 
    <Containerer fluid="xxl">        
        <Row>
          <Col sm={6}>
            <h2 className='title'>
              <span>Easy</span>
              Donation Process
            </h2>
              <div className='step'>
                <h3 className='title'>
                <span style={{ color: '#7EB65C' }}> 01.</span>
                Choose a Pet. 
                </h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>            
              </div>          
              <div className='step'>
                <h3 className='title'>
                <span style={{ color: '#FF7F18' }}> 02.</span>
                Fill the Form
                </h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>            
              </div>     
              <div className='step'>
                <h3 className='title'>
                <span style={{ color: '#9E0C0F' }}> 03.</span>
                Submit Form
                </h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>            
              </div>          
              <a className='button-1' href='#!' role='button'>
                Read More
              </a>
          </Col>
          <Col className='pic'>
            <img src={`/donation-process-pic.png`} alt={"About Pic"} />
          </Col>
        </Row>
        </Containerer>
    </div>
  )
}

export default DonationProcess