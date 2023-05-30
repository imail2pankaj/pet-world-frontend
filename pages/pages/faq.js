import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { PageHeader, WhyVetChoosePetWorld } from '@/components/Common'

const FAQs = () => {
  return (
    <div className='inner-main'>
      <PageHeader banner={"/faq-bg.jpg"} title={'FAQs'} />
      <div className='faq-main'>
        <div className='graphic-1'><img src={`/questions-img.png`} alt={""} /></div>

        <Container fluid="xxl">
          <div className='question-ans'>
            <Accordion defaultActiveKey={0}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                <Accordion.Item key={item} eventKey={item}>
                  <Accordion.Header>{item + 1} Lorem Ipsum is simply dummy text?</Accordion.Header>
                  <Accordion.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Container>

        <WhyVetChoosePetWorld />
      </div>
    </div>
  )
}

export default FAQs