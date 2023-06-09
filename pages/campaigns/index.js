import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Spinner } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import { CampaignCard, WhyVetChoosePetWorld } from '@/components/Common';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { capitalize } from '@/core/utils/format';
import axiosInstance from '@/store/api/axiosInstance';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const approvalStatus = [{id:"", name:"All Approval"},{id:"1", name:"Approved"}, {id:"2", name:"Not Approved"}];
const paymentStatus = [{id:"", name:"All Payments"},{id:"1", name:"Paid"}, {id:"2", name:"Not Paid"}];

const Campaigns = () => {

  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState('');
  const [approvals, setApprovals] = useState('');
  const [query, setQuery] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [sortBy, setSortBy] = useState("Latest");

  const fetchCampaigns = async () => {
    setLoading(true)
    const params = {
      sort: sortBy,
      // page: currentPage,
      // per_page: dataPerPage,
      payments: payments,
      approvals: approvals,
      q: query
    }
    axiosInstance.get('/campaigns-list?' + (new URLSearchParams(params))).
      then(response => {
        setLoading(false);
        setCampaigns(response.data || []);
      });
  }
  // useEffect(() => {
  //   setCampaigns(initialCampaigns);
  // }, [])

  useEffect(() => {
    fetchCampaigns()
  }, [query, sortBy, approvals, payments])

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

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
              <Form style={{width:"auto"}}>
                <Form.Group className="search-field d-flex" controlId="formBasicEmail">
                  <Form.Control type="text" className='me-4' onChange={(e) =>setQuery(e.target.value)}  placeholder="Search Campaigns" />
                  <Form.Select
                    onChange={(e) =>setApprovals(e.target.value)}
                    defaultValue={""}
                    className='form-control me-4'>
                    {approvalStatus.map(approval => <option value={approval.id} key={approval.id}>{t(approval.name)}</option>)}
                  </Form.Select>
                  <Form.Select
                    onChange={(e) =>setPayments(e.target.value)}
                    defaultValue={""}
                    className='form-control'>
                    {paymentStatus.map(payment => <option value={payment.id} key={payment.id}>{t(payment.name)}</option>)}
                  </Form.Select>
                </Form.Group>
              </Form>

              <div className='filter'>
                <DropdownButton id="dropdown-item-button" title={`Sort By:  ${t(capitalize(sortBy))}`}>
                  <Dropdown.Item onClick={() => setSortBy('a-z')} as="button">A-Z</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('z-a')} as="button">Z-A</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('latest')} as="button">{t("Latest")}</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('oldest')} as="button">{t("Oldest")}</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </Row>


          <div className='doctor-list'>
            <Row xs={1} md={2} lg={3} xxl={4}>
              {(!loading && campaigns) && campaigns.map((item, index) =>
                <Col key={item.id}>
                  <CampaignCard campaign={item} is_paid={(index + 1) % 2} />
                </Col>
              )}
            </Row>
            <div className='d-block text-center'>
              {loading && <Spinner />}
              {!loading && campaigns.length === 0 ? "No campaigns Found" : ""}
            </div>
            {/* <Row>
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
            </Row> */}
          </div>
        </div>
      </Container>

      <WhyVetChoosePetWorld />
    </div>

  )
}

export default Campaigns


export async function getStaticProps({ locale }) {
  // const campaigns = await axiosInstance.get('campaigns-list');
  // console.log(campaigns);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),

      // initialCampaigns: campaigns?.data || []
      // Will be passed to the page component as props
    },
    revalidate: 100,
  }
}