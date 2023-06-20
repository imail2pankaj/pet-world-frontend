import Link from 'next/link'
import React, { Fragment, lazy, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { Badge, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MdRemoveRedEye } from "react-icons/md";
import { CustomTooltip, DocumentVerificationStatus } from '@/components/Common'
import { fetchCampaignRequests } from '@/store/api/campaign-request'

const CampaignRequests = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const store = useSelector(state => state.campaignRequest);

  const campaignRequestList = () => {
    dispatch(fetchCampaignRequests({
      q: "",
      limit: 10,
      column: 'id',
      sort: 'desc',
    }))
  }
  useEffect(() => {
    campaignRequestList();
  }, [dispatch])

  return (
    <>
      <ProtectedLayout title={t('Campaign Requests')} openGraph={{ title: t('Campaign Requests') }}>
        <div className='inner-page'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Campaign Requests")}</h2></Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                <Table className="table-list" hover responsive>
                  <thead>
                    <tr>
                      <th>{t("Campaign Title")}</th>
                      <th>{t("Pet Owner Email")}</th>
                      <th>{t("Documents Uploaded")}</th>
                      <th>{t("Campaign Date")}</th>
                      <th>{t("Goal Amount")}</th>
                      <th>{t("Status")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      store?.data?.map(item => (
                        <Fragment key={item.id}>
                          <tr>
                            <td>{item?.campaign?.title}</td>
                            <td>{item?.campaign?.pet_owner_email}</td>
                            <td>Yes</td>
                            <td>{item?.campaign.start_date ? item?.campaign.start_date : "N/A"}</td>
                            <td>€ {item?.campaign?.goal_amount}</td>
                            <td>
                              <Badge pill bg={item.status == 0 ? 'secondary' : (item.status == 1 ? 'primary' : 'danger')} >
                                <DocumentVerificationStatus status={item.status} />
                              </Badge>
                            </td>
                            <td>
                              <CustomTooltip message={'View Campaign Documents'}>
                                <Link href={`/dashboard/campaign-requests/view/${item.id}`} className='btn btn-secondary btn-sm'><MdRemoveRedEye /></Link>
                              </CustomTooltip>
                            </td>
                          </tr>
                        </Fragment>
                      ))
                    }
                    {store?.data?.length == 0 ? <tr><td colSpan="7" className='text-center'>{t("No Record Found")}</td></tr> : null}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default CampaignRequests

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