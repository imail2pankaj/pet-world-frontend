import Link from 'next/link'
import React, { lazy, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { Badge, Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCampaigns } from '@/store/api/campaign'
import { useEffect } from 'react'
import { campaignStatus, passportAvailability, vaccination } from '@/core/utils/constants'
import { BiEdit, BiTrash } from "react-icons/bi";
import { ConfirmDelete } from '@/components/Common'

const DoctorCampaigns = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [campaignId, setCampaignId] = useState(null);

  const store = useSelector(state => state.campaign);

  const campaignList = () => {
    dispatch(fetchCampaigns({
      q: "",
      limit: 10,
      column: 'id',
      sort: 'desc',
    }))
  }
  useEffect(() => {
    campaignList();
  }, [dispatch])

  const handleClose = (campaignId) => {
    setCampaignId(campaignId);
    setShow(true)
  }

  return (
    <>
      <ProtectedLayout title={t('Campaigns')} openGraph={{ title: t('Campaigns') }}>
        <div className='edit-profile'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Campaigns")}</h2></Col>
              <Col className='text-end'><Link href={'/dashboard/campaigns/create'}>{t("Create")}</Link> </Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                <Table className="table-list" hover responsive>
                  <thead>
                    <tr>
                      <th>{t("Title")}</th>
                      <th>{t("Pet Owner Email")}</th>
                      <th>{t("Participation")}</th>
                      <th>{t("Campaign Date")}</th>
                      <th>{t("Goal Amount")}</th>
                      <th>{t("Status")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      store?.data?.map(item => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.pet_owner_email}</td>
                          <td><Badge variant="secondary">{item.pet_owner_participation}%</Badge></td>
                          <td>{item.start_date ? item.start_date : "N/A"}</td>
                          <td>€ {item.goal_amount}</td>
                          <td><Badge pill bg={item.status == 1 ? 'primary' : 'secondary'} >{campaignStatus[item.status]}</Badge></td>
                          <td>
                            <Link href={`/dashboard/campaigns/edit/${item.id}`} ><BiEdit /></Link> {` `}
                            <Button onClick={() => handleClose(item.id)} ><BiTrash /></Button>
                          </td>
                        </tr>
                      ))
                    }
                    {store?.data?.length == 0 ? <tr><td colSpan="7" className='text-center'>{t("No Record Found")}</td></tr> : null}
                  </tbody>
                </Table>
                <ConfirmDelete
                  desc={'Do you want to delete Campaign?'}
                  show={show}
                  list={campaignList}
                  petUrl={`/campaigns/${campaignId}`}
                  handleClose={setShow}
                />
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default DoctorCampaigns

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
    revalidate: 100,
  }
}