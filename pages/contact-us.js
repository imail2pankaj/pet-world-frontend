import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import { PageHeader, WhyVetChoosePetWorld } from '@/components/Common'

const ContactUs = () => {
  return (
    <div className='inner-main'>
      <PageHeader banner={`/contact-bg.jpg`} title={"Contact us"} />

      <Container fluid="xxl">
        <div className='contactus-main'>
          <h2>Assistance and advices from <span>PetWorld 24/7</span></h2>
          <p>Get in touch with our community happiness team.</p>

          <div className='form-map'>
            <div className='form'>
              <p className="text-start fw-bold">Required fields are marked*</p>
              <Form>
                <Row xs={1} md={2}>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control type="email" placeholder="Your name*" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Control type="email" placeholder="Your email*" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control type="email" placeholder="Your phone*" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control type="email" placeholder="Subject" />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows={5} placeholder='Message...' />
                </Form.Group>
                <Row className="justify-content-center">
                  <Button variant="primary" type="submit">
                    Send a message
                  </Button>
                </Row>
              </Form>
            </div>
            <div className='map'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2931.317654606427!2d23.294809676622027!3d42.71816691240152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa9007a52e1a85%3A0x1331859da2e56ad3!2sA1!5e0!3m2!1sen!2sin!4v1684236110016!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          <div className='addres-phone'>
            <div className='email'><img src={`/email-icon.png`} alt={""} />
              <h3>Send us an email</h3>
              <span>info@petworld.com</span>
            </div>
            <div className='email phone'><img src={`/phone-icon.png`} alt={""} />
              <h3>Got Question? Call us 24/7</h3>
              <span>(0)123456789</span>
            </div>
            <div className='email address'><img src={`/address-icon.png`} alt={""} />
              <h3>Our address</h3>
              <span>A-1, Envanto HQ, Bulgaria.</span>
            </div>
          </div>

          <Row className="justify-content-center">
            <div className='foundation'>
              <img src={`/logo-icon.png`} alt={"logo"} />
              <h5>PetWorld Foundation</h5>
              <p>Non-profit organization registered by the Ministry of Justice in the Republic of Bulgaria with <span>Certificate No 30 / 01.01.2020</span></p>
            </div>
          </Row>
          <Row className="justify-content-center">
            <div className='social'>
              <h4>You can follow us:</h4>
              <Link href={'/'}><img src={`/fb-icon.png`} alt={"Facebook"} /></Link>
              <Link href={'/'}><img src={`/tw-icon.png`} alt={"Twitter"} /></Link>
              <Link href={'/'}><img src={`/in-icon.png`} alt={"linkedin"} /></Link>
              <Link href={'/'}><img src={`/insta-icon.png`} alt={"Instagram"} /></Link>
            </div>
          </Row>

        </div>
      </Container>

      <WhyVetChoosePetWorld />
    </div>
  )
}

export default ContactUs