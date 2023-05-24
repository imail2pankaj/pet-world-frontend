import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import { CampaignCard, WhyVetChoosePetWorld } from '@/components/Common';


const Campaigns = () => {
  return (
    <div className='inner-main'>
      {/* {campaigns.map(campaign => <CampaignCard campaign={campaign} key={campaign.id} />)} */}
      <div className='header'>
        <div><img src={`/campaign-bg.jpg`} alt={"Header"} /></div>
        <h3>Campaigns</h3>
      </div>
      <Container fluid="xxl">
        <div className='doctors-main'>
          <Row>
            <div className='filter-main'>
              <Form>
                <Form.Group className="search-field" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Search Event" />
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(item =>
                <Col key={item}>
                  <CampaignCard />
                </Col>
              )}
            </Row>
            <Row>
              <Pagination className="justify-content-center mt-4">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{8}</Pagination.Item>
                <Pagination.Item>{9}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Row>

          </div>
        </div>
      </Container>

      <WhyVetChoosePetWorld />
    </div>

  )
}

export default Campaigns
