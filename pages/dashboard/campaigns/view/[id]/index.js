import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import axiosInstance from '@/store/api/axiosInstance'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { passportAvailability, vaccination } from '@/core/utils/constants'
import { dateFormat } from '@/core/utils/format'
import Carousel from 'react-bootstrap/Carousel';
import { DocumentVerificationStatus } from '@/components/Common'
import { getCampaign } from '@/store/api/campaign'
import Link from 'next/link'

const ViewCampaignDocuments = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const store = useSelector(state => state.campaign);

  useEffect(() => {
    dispatch(getCampaign(router?.query?.id))
  }, [dispatch, router?.query?.id])


  return (
    <ProtectedLayout title={t('Campaign')} openGraph={{ title: t('Campaign') }}>
      <div className='inner-page'>
        <div className='form'>
          <Row>
            <Col><h2>{t("Campaign")} - {store?.campaignData?.title}</h2></Col>
            <Col className='text-end'><Link href={'/dashboard/campaigns'} className='btn btn-danger'>{t("List")}</Link> </Col>
          </Row>
          {store.campaignData ?
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                <div className='mb-4'>
                  <h4>{t("Campaign Documents")}</h4>
                  <hr />
                  {store?.campaignData?.documents?.length != 0 ? <Row sm={1} md={2}>
                    <Carousel>
                      {store?.campaignData?.documents?.map(document => (
                        <Carousel.Item key={document.id}>
                          <img
                            className="d-block w-100"
                            src={document.name}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Row> : <Alert variant='warning' >Documents are not Uploaded by the Pet Owner</Alert>}
                </div>
                <div className='mb-4'>
                  <h4>{t("Campaign Requests")}</h4>
                  <hr />
                  {store?.campaignData?.approval?.map((req, index) => (
                    <Row sm={2} md={4} key={index}>
                      <p><b>{t("Doctor Name")}: </b> {req?.doctor?.first_name} {req?.doctor?.surname}</p>
                      <p><b>{t("Username")}: </b> {req?.doctor?.username}</p>
                      <p><b>{t("Request Status")}: </b> <DocumentVerificationStatus status={req?.status} /></p>
                      <p><b>{t("Note")}: </b> {req?.notes}</p>
                    </Row>
                  ))}
                </div>
                <div className='mb-4'>
                  <h4>{t("Pet Details")}</h4>
                  <hr />
                  <Row sm={1} md={3}>
                    <p><b>{t("Pet Name")}: </b> {store?.campaignData?.pet?.name}</p>
                    <p><b>{t("Pet Type")}: </b> {store?.campaignData?.pet?.pet_type}</p>
                    <p><b>{t("Animal Type")}: </b> {store?.campaignData?.pet?.animal_type}</p>
                    <p><b>{t("Breed")}: </b> {store?.campaignData?.pet?.breed}</p>
                    <p><b>{t("Gender")}: </b> {store?.campaignData?.pet?.gender}</p>
                    <p><b>{t("Age")}: </b> {store?.campaignData?.pet?.age}</p>
                    <p><b>{t("Weight")}: </b> {store?.campaignData?.pet?.weight}</p>
                    <p><b>{t("Location")}: </b> {store?.campaignData?.pet?.location}</p>
                    <p><b>{t("Passport")}: </b> {passportAvailability[store?.campaignData?.pet?.passport_available]}</p>
                    <p><b>{t("Vaccinations")}: </b> {vaccination[store?.campaignData?.pet?.vaccinations]}</p>
                    <p><b>{t("Previous Diseases")}: </b> {store?.campaignData?.pet?.previous_diseases}</p>
                  </Row>
                </div>
                <div>
                  <h4>{t("Campaign Details")}</h4>
                  <hr />
                  <Row sm={1} md={3}>
                    <p><b>{t("Campaign Unique ID")}: </b> {store?.campaignData?.unique_id}</p>
                    <p><b>{t("Campaign")}: </b> {store?.campaignData?.title}</p>
                    <p><b>{t("Campaign Date")}: </b> {dateFormat(store?.campaignData?.start_date)}</p>
                    <p><b>{t("Goal Amount")}: </b> €{store?.campaignData?.goal_amount}</p>
                    <p><b>{t("Treatment")}: </b> {store?.campaignData?.treatment}</p>
                    <p><b>{t("Participation")}: </b> <Badge bg="primary">{store?.campaignData?.pet_owner_participation}%</Badge></p>
                    <p><b>{t("Campaign Created Date")}: </b> {dateFormat(store?.campaignData?.created_at)}</p>
                    <p><b>{t("Documents Uploaded")}: </b> {t(store?.campaignData?.documents?.length == 0 ? 'No' : 'Yes')}</p>
                  </Row>
                  <Row>
                    <p><b>{t("Description")}: </b></p>
                    <p>{store?.campaignData?.description}</p>
                  </Row>
                </div>
              </div>
            </div>
            : <Spinner />}
        </div>
      </div>
    </ProtectedLayout>
  )
}

export default ViewCampaignDocuments


export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    }
  }
}


