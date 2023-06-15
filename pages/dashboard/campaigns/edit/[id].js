import React, { useCallback, useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { InnerNavbar, PrimarySubmit, ValidationError } from '@/components/Common'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Badge, Button, Container, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { animalGender, animalType, campaignStatuses, passportAvailable, petType, vaccinations } from '@/core/utils/constants';
import { createPet, getCampaign, updateCampaign } from '@/store/api/campaign';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from "react-dropzone";
import ProtectedLayout from '@/components/Layout/ProtectedLayout';
import Link from 'next/link';
import nextI18nextConfig from '@/next-i18next.config';
import axiosInstance from '@/store/api/axiosInstance';
import ReactDatePicker from 'react-datepicker';

const schema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  gender: yup.string().required(),
  pet_type: yup.string().required(),
  animal_type: yup.string().required(),
  age: yup.string().required()
})

const defaultValues = {
  title: '',
  goal_amount: 0,
  start_date: '',
  description: '',
  status: 0,
  email: '',
  weight: 0,
  pet_owner_email: '',
  pet_owner_participation: 0,
}

const PetCreate = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const { query: { id } } = router;
  const [serverResponse, setServerResponse] = useState("")
  const [selectDate, setSelectDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [participation, setParticipation] = useState(defaultValues.pet_owner_participation)

  const dispatch = useDispatch();

  const store = useSelector(state => state.campaign);

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

  useEffect(() => {
    dispatch(getCampaign(id)).then((response) => {
      const data = response?.payload?.data;
      for (const key in defaultValues) {
        if(key === 'pet_owner_participation') {
          setParticipation(data[key]);
          setValue(key, data[key] ? data[key].toString() : "");
        } else {
          setValue(key, data[key] ? data[key].toString() : "");
        }
      }
    })
  }, [dispatch, id])

  useEffect(() => {
    if (store?.error && isLoading) {
      const message = store?.error?.error ? store?.error?.error : store?.error?.message;
      toast.error(message);
      setServerResponse({
        variant: "danger",
        message: message
      })
      if (store?.error?.errors) {
        Object.keys(store?.error?.errors).forEach((key) => {
          const error = store?.error?.errors;
          setError(key, {
            type: "server",
            message: error[key][0]
          });
        });
      }
      setIsLoading(false);
    } else if (store?.petData && isLoading) {
      reset();
      toast.success(t("Campaign Successfully Updated"));
      setServerResponse({
        variant: "success",
        message: "Campaign Successfully Updated"
      })
      setHeroFiles([]);
      setIsLoading(false);
      router.replace("/dashboard/campaigns");
    }
  }, [dispatch, store])

  const onSubmit = data => {
    setIsLoading(true);
    setServerResponse("");

    const formData = new FormData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        formData.append(key, element);
      }
    }

    dispatch(updateCampaign({formData, id}))
  }

  return (
    <>
      <ProtectedLayout title={t('Campaign Edit')} openGraph={{ title: t('Campaign Edit') }}>
        <div className='edit-profile'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Campaign")} <b>{t("Edit")}</b></h2></Col>
              <Col className='text-end'><Link href={'/dashboard/campaigns'}>{t("List")}</Link> </Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                  {t(serverResponse.message)}
                </Alert>}
                <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Row xs={1} md={3}>
                    <Form.Group>
                      <Form.Label>{t("Campaign Title")}</Form.Label>
                      <Form.Control
                        autoFocus
                        name='title'
                        type='text'
                        label={t("Campaign Title")}
                        placeholder={t("Enter Campaign Title")}
                        isInvalid={Boolean(errors.title)}
                        {...register('title', { required: true })}
                      />
                      <ValidationError errors={errors.title} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Campaign Date')}</Form.Label>
                      <ReactDatePicker
                        name='start_date'
                        className='form-control'
                        placeholderText={t('Select Campaign Date')}
                        placeholder={t('Select Campaign Date')}
                        dateFormat="dd/MM/yyyy"
                        selected={selectDate}
                        onChange={(date) => { setValue('start_date', date); setSelectDate(date) }}
                      />
                      <ValidationError errors={errors.start_date} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Goal Amount")}</Form.Label>
                      <Form.Control
                        name='goal_amount'
                        type='number'
                        label={t('Goal Amount')}
                        placeholder={t("Enter Goal Amount")}
                        isInvalid={Boolean(errors.goal_amount)}
                        {...register('goal_amount', { required: true })}
                      />
                      <ValidationError errors={errors.goal_amount} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={1} className='mb-4'>
                    <Form.Group md={6}>
                      <Form.Label>{t("Description")}</Form.Label>
                      <Form.Control
                        name='description'
                        type='text'
                        multiple
                        as="textarea"
                        style={{height:220}}
                        label={t('Description')}
                        placeholder={t("Enter Description")}
                        isInvalid={Boolean(errors.description)}
                        {...register('description')}
                      />
                      <ValidationError errors={errors.description} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={3}>
                    <Form.Group>
                      <Form.Label>{t("Pet Owner Email")}</Form.Label>
                      <Form.Control
                        name='pet_owner_email'
                        type='email'
                        label={t('Pet Owner Email')}
                        placeholder={t("Enter Pet Owner Email")}
                        isInvalid={Boolean(errors.pet_owner_email)}
                        {...register('pet_owner_email', { required: true })}
                      />
                      <ValidationError errors={errors.pet_owner_email} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Pet Owner Participation")} <Badge bg="secondary">{`${participation}%`}</Badge></Form.Label>
                      <Form.Range
                        name='pet_owner_participation'
                        min="0" max="50" 
                        defaultValue={participation}
                        onInput={(e) => setParticipation(e.target.value)}
                        label={t('pet_owner_participation')}
                        placeholder={t("Select Pet Owner Participation")}
                        {...register('pet_owner_participation', { required: true })}
                      />
                      <ValidationError errors={errors.pet_owner_participation} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Status')}</Form.Label>
                      <Form.Select
                        defaultValue={0}
                        className='form-control'
                        name='status'
                        {...register("status", { required: true })}>
                        {campaignStatuses.map(status => <option value={status.value} key={status.value}>{t(status.name)}</option>)}
                      </Form.Select>
                      <ValidationError errors={errors.status} />
                    </Form.Group>
                  </Row>

                  <Row xs={1} md={3}>
                    <div className="mb-5">
                      <Button variant='primary' type='submit'>
                        {isLoading && <Spinner size='sm' className='me-2' />}
                        {t("Save")}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default PetCreate

export async function getServerSideProps({ locale, query }) {
  const { id } = query;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'], nextI18nextConfig))
    },
  }
}