import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import axiosInstance from '@/store/api/axiosInstance'
import { getCampaignRequest, updateCampaignRequest } from '@/store/api/campaign-request'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { campaignApprovalStatuses, passportAvailability, vaccination } from '@/core/utils/constants'
import { dateFormat } from '@/core/utils/format'
import Carousel from 'react-bootstrap/Carousel';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ValidationError } from '@/components/Common'
import { toast } from 'react-hot-toast'

const defaultValues = {
  status: "0",
  notes: '',
}

const schema = yup.object().shape({
  status: yup.string().required()
})

const ViewCampaignDocuments = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const store = useSelector(state => state.campaignRequest);

  useEffect(() => {
    dispatch(getCampaignRequest(router?.query?.id)).then(response => {
      if (store.campaignRequestData) {
        setValue("status", store.campaignRequestData?.status == 0 ? store.campaignRequestData?.status : store.campaignRequestData?.status.toString())
        setValue("notes", store.campaignRequestData?.notes)
      }
    });
  }, [dispatch, router?.query?.id])

  const {
    control,
    register,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {

    setIsLoading(true);
    setServerResponse("");

    dispatch(updateCampaignRequest({ data, requestId: router?.query?.id })).then(() => {
      setIsLoading(false);
      setServerResponse("Campaign request updated successfully");
      toast.success("Campaign request updated successfully")
      router.push('/dashboard/campaign-requests');
    })
  }

  return (
    <ProtectedLayout title={t('Campaign Requests')} openGraph={{ title: t('Campaign Requests') }}>
      <div className='inner-page'>
        <div className='form'>
          <Row>
            <Col><h2>{t("Campaign Request")}</h2></Col>
          </Row>
          <div className="mb-3 mt-5 lg-3">
            <div className="mb-3">
              <div className='mb-4'>
                <h4>{t("Campaign Documents")}</h4>
                <hr />
                <Row sm={1} md={2}>
                  <Carousel>
                    {
                      store?.campaignRequestData?.campaign?.documents?.map(document => (
                        <Carousel.Item key={document.id}>
                          <img
                            className="d-block w-100"
                            src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}storage/campaign-documents/${document.name}`}
                          />
                        </Carousel.Item>
                      ))
                    }
                  </Carousel>
                  <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                      {t(serverResponse.message)}
                    </Alert>}
                    <Form.Group controlId="campaignApprovalStatus" className='mb-4'>
                      <Form.Label className='d-block mb-4'>{t('Campaign Approval Status')}</Form.Label>
                      {campaignApprovalStatuses.map(type =>
                        <Form.Check
                          key={"keys-" + type.value}
                          className='d-inline-block me-4'
                          value={`${type.value}`}
                          name='status'
                          type={'radio'}
                          label={t(type.name)}
                          id={`status-${type.value}`}
                          {...register("status")}
                        />
                      )}
                      <ValidationError errors={errors.status} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Notes")}</Form.Label>
                      <Form.Control
                        name='notes'
                        type='text'
                        multiple
                        as="textarea"
                        style={{ height: 220 }}
                        label={t('notes')}
                        placeholder={t("Enter Notes")}
                        isInvalid={Boolean(errors.notes)}
                        {...register('notes')}
                      />
                      <ValidationError errors={errors.notes} />
                    </Form.Group>
                    <div className='edit-profile'>
                      <div className='form'>
                        <Button variant='primary' type='submit'>
                          {isLoading && <Spinner size='sm' className='me-2' />}
                          {t("Save")}
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Row>
              </div>
              <div className='mb-4'>
                <h4>{t("Pet Details")}</h4>
                <hr />
                <Row sm={1} md={3}>
                  <p><b>{t("Pet Name")}: </b> {store?.campaignRequestData?.campaign?.pet?.name}</p>
                  <p><b>{t("Pet Type")}: </b> {store?.campaignRequestData?.campaign?.pet?.pet_type}</p>
                  <p><b>{t("Animal Type")}: </b> {store?.campaignRequestData?.campaign?.pet?.animal_type}</p>
                  <p><b>{t("Breed")}: </b> {store?.campaignRequestData?.campaign?.pet?.breed}</p>
                  <p><b>{t("Gender")}: </b> {store?.campaignRequestData?.campaign?.pet?.gender}</p>
                  <p><b>{t("Age")}: </b> {store?.campaignRequestData?.campaign?.pet?.age}</p>
                  <p><b>{t("Weight")}: </b> {store?.campaignRequestData?.campaign?.pet?.weight}</p>
                  <p><b>{t("Location")}: </b> {store?.campaignRequestData?.campaign?.pet?.location}</p>
                  <p><b>{t("Passport")}: </b> {passportAvailability[store?.campaignRequestData?.campaign?.pet?.passport_available]}</p>
                  <p><b>{t("Vaccinations")}: </b> {vaccination[store?.campaignRequestData?.campaign?.pet?.vaccinations]}</p>
                  <p><b>{t("Previous Diseases")}: </b> {store?.campaignRequestData?.campaign?.pet?.previous_diseases}</p>
                </Row>
              </div>
              <div>
                <h4>{t("Campaign Details")}</h4>
                <hr />
                <Row sm={1} md={3}>
                  <p><b>{t("Campaign Unique ID")}: </b> {store?.campaignRequestData?.campaign?.unique_id}</p>
                  <p><b>{t("Campaign")}: </b> {store?.campaignRequestData?.campaign?.title}</p>
                  <p><b>{t("Campaign Date")}: </b> {dateFormat(store?.campaignRequestData?.campaign?.start_date)}</p>
                  <p><b>{t("Goal Amount")}: </b> €{store?.campaignRequestData?.campaign?.goal_amount}</p>
                  <p><b>{t("Treatment")}: </b> {store?.campaignRequestData?.campaign?.treatment}</p>
                  <p><b>{t("Participation")}: </b> <Badge bg="primary">{store?.campaignRequestData?.campaign?.pet_owner_participation}%</Badge></p>
                  <p><b>{t("Campaign Created Date")}: </b> {dateFormat(store?.campaignRequestData?.campaign?.created_at)}</p>
                  <p><b>{t("Documents Uploaded")}: </b> {t(store?.campaignRequestData?.campaign?.documents?.length == 0 ? 'No' : 'Yes')}</p>
                </Row>
                <Row>
                  <p><b>Description: </b></p>
                  <p>{store?.campaignRequestData?.campaign?.description}</p>
                </Row>
              </div>
            </div>
          </div>
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


