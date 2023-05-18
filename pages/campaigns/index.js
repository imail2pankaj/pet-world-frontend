import CampaignCard from '@/components/Common/CampaignCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';


const campaigns = [
    {
        id: 1,
        title: 'Title 1',
        image: '/logo-en.png',
        description: 'Desc 1',
        goal_amount: '50000',
        raised_amount: '25000',
    },
    {
        id: 2,
        title: 'Title 2',
        image: '/logo-en.png',
        description: 'Desc 2',
        goal_amount: '50000',
        raised_amount: '25000',
    },
    {
        id: 3,
        title: 'Title 3',
        image: '/logo-en.png',
        description: 'Desc 3',
        goal_amount: '50000',
        raised_amount: '25000',
    },
    {
        id: 4,
        title: 'Title 4',
        image: '/logo-en.png',
        description: 'Desc 4',
        goal_amount: '50000',
        raised_amount: '25000',
    },
];

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
                        <Row xs={1} md={2} lg={4}>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
                            </Col>
                            <Col>
                                <CampaignCard />
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
            </Container>

            <div className='why-choose-us'>
                <Container fluid="xxl">
                    <Row>
                        <h2 className='title'>Why Vet choose PetWorld</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br /> tempor incididunt ut labore</p>
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
                </Container>
            </div>
        </div>

    )
}

export default Campaigns
