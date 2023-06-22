import Link from 'next/link'
import React, { Fragment, lazy, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { Badge, Button, Col, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCampaigns, sendEmailToAppointedDoctor, sendEmailToPetOwner } from '@/store/api/campaign'
import { useEffect } from 'react'
import { campaignStatus, defaultAvatar, passportAvailability, vaccination } from '@/core/utils/constants'
import { BiCheck, BiEdit, BiMailSend, BiRepeat, BiSend, BiTrash } from "react-icons/bi";
import { MdClose, MdPendingActions, MdRemoveRedEye } from "react-icons/md";
import { Avatar, ConfirmDelete, CustomTooltip, DocumentVerificationStatus } from '@/components/Common'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { dateFormat } from '@/core/utils/format'

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

  const handleSendEmailToPetOwner = (cId) => {
    dispatch(sendEmailToPetOwner(cId)).then(() => {
      toast.success('Sent email to Pet Owner about the campaign status')
    })
  }

  const handleSendEmailToAppointedDoctor = (cId, doctorId) => {
    dispatch(sendEmailToAppointedDoctor({ cId, doctorId })).then(() => {
      toast.success('Sent email to Appointed Doctor about the campaign status')
    })
  }

  return (
    <>
      <ProtectedLayout title={t('Campaigns')} openGraph={{ title: t('Campaigns') }}>
        <div className='inner-page'>
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
                        <Fragment key={item.id}>
                          <tr>
                            <td>{item.title}</td>
                            <td>
                              {item.pet_owner_email}
                              <CustomTooltip message="Send Email to Pet Owner">
                                <Button variant='outline-danger' className='ms-2' size='sm' onClick={() => handleSendEmailToPetOwner(item.id)} ><BiMailSend /></Button>
                              </CustomTooltip>
                            </td>
                            <td><Badge variant="secondary">{item.pet_owner_participation}%</Badge></td>
                            <td>{item.start_date ? dateFormat(item.start_date) : "N/A"}</td>
                            <td>€ {item.goal_amount}</td>
                            <td><Badge pill bg={item.status == 1 ? 'primary' : 'secondary'} >{campaignStatus[item.status]}</Badge></td>
                            <td>
                              <CustomTooltip message={'View Campaign'}>
                                <Link href={`/dashboard/campaigns/view/${item.id}`} className='btn btn-secondary btn-sm'><MdRemoveRedEye /></Link>
                              </CustomTooltip>
                              {` `}
                              <CustomTooltip message={'Edit Campaign'}>
                                <Link href={`/dashboard/campaigns/edit/${item.id}`} className='btn btn-secondary btn-sm'><BiEdit /></Link>
                              </CustomTooltip>
                              {` `}
                              <CustomTooltip message={'Delete Campaign'}>
                                <Button variant='danger' size='sm' onClick={() => handleClose(item.id)} ><BiTrash /></Button>
                              </CustomTooltip>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3}>
                              <p className='mb-0'><b>{t("Pet Added")}: </b>{t(item.pet ? 'Yes' : 'No')}</p>
                              <p className='mb-0'><b>{t("Documents Uploaded")} : </b>{t(item?.documents?.length ? 'Yes' : 'No')}</p>
                            </td>
                            <td colSpan={4}>
                              <p className='mb-1'><b>{t("Approval Requests")}: </b></p>
                              {item.campaign_approval.map(approval => (
                                <p className='mb-1' key={approval.id}>
                                  <DocumentVerificationStatus status={approval?.status} />
                                  <Link href={`/doctors/${approval?.doctor?.username}`}>
                                    <Avatar className={'ms-2 me-2'} src={approval?.doctor?.profile_image} height={25} width={25} alt={approval?.doctor?.surname} />
                                    {approval?.doctor?.first_name} {approval?.doctor?.surname}
                                  </Link>
                                  {approval?.status == 0 &&
                                    <CustomTooltip message="Send Email to Appointed Doctor">
                                      <Button variant='outline-danger' className='ms-2' size='sm' onClick={() => handleSendEmailToPetOwner(item.id)} ><BiMailSend /></Button>
                                    </CustomTooltip>}
                                </p>
                              ))}
                            </td>
                          </tr>
                        </Fragment>
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