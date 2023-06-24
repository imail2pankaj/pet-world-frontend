import React, { useCallback, useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { InnerNavbar, PrimarySubmit, ValidationError } from '@/components/Common'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, Container, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { animalGender, animalType, passportAvailable, petType, vaccinations } from '@/core/utils/constants';
import { createPet } from '@/store/api/pet';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from "react-dropzone";
import ProtectedLayout from '@/components/Layout/ProtectedLayout';
import Link from 'next/link';

const schema = yup.object().shape({
  name: yup.string().max(64).required(),
  location: yup.string().max(64).required(),
  gender: yup.string().required(),
  pet_type: yup.string().required(),
  animal_type: yup.string().required(),
  age: yup.number().max(200).required(),
  weight: yup.number().max(1000),
  previous_diseases: yup.string().max(255),
})

const defaultValues = {
  campaign_id: 0,
  name: '',
  location: '',
  breed: '',
  gender: 'Male',
  pet_type: 'Dog',
  animal_type: 'Domestic',
  age: 0,
  weight: 0,
  passport_available: "0",
  vaccinations: "0",
  previous_diseases: "",
}

const PetCreate = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [heroFiles, setHeroFiles] = useState([]);

  const dispatch = useDispatch();

  const store = useSelector(state => state.pet);

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
      toast.success("Pet Successfully Created");
      setServerResponse({
        variant: "success",
        message: "Pet Successfully Created"
      })
      setHeroFiles([]);
      setIsLoading(false);
      if(router?.query?.campaign_id){
        router.push('/dashboard/pets/campaign-documents?petId=' + store?.petData?.id)
      } else {
        router.push('/dashboard/pets')
      }
    }

    if(router?.query?.campaign_id){
      setValue('campaign_id', router?.query?.campaign_id);
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
    heroFiles.map((file) => {
      formData.append("pet_images[]", file);
    })

    dispatch(createPet(formData))
  }

  return (
    <>
      <ProtectedLayout title={t('Pet Create')} openGraph={{ title: t('Pet Create') }}>
        <div className='edit-profile'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Pet")} <b>{t("Create")}</b></h2></Col>
              <Col className='text-end'><Link href={'/dashboard/pets'}>{t("List")}</Link> </Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                  {t(serverResponse.message)}
                </Alert>}
                <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Dropzone className="mb-4" accept={{ 'image/jpeg': [], 'image/png': [], 'video/mp4': [] }} onDrop={(acceptedFiles) => {
                    setHeroFiles(acceptedFiles.map(file => Object.assign(file, {
                      preview: URL.createObjectURL(file)
                    })));
                  }} name="heroImage" multiple={true}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <span style={{ fontSize: ".8rem" }}>
                          <p>{t("Drag and drop some files here, or click to select files")}</p>
                          <em>({t("Only *.jpeg and *.png images, videos will be accepted")})</em>
                        </span>
                      </div>
                    )}
                  </Dropzone>

                  <div className='d-flex mb-4'>
                    {
                      heroFiles?.map((file, index) => <Image style={{ objectFit: "contain", marginRight: 10 }} key={index} src={file.preview} height={100} width={100} alt="test" />)
                    }
                  </div>
                  <Row xs={1} md={3}>
                    <Form.Group>
                      <Form.Label>{t("Name")}</Form.Label>
                      <Form.Control
                        autoFocus
                        name='name'
                        type='text'
                        label={t("Pet Name")}
                        placeholder={t("Enter Pet Name")}
                        isInvalid={Boolean(errors.name)}
                        {...register('name', { required: true, minLength: { value: 3 } })}
                      />
                      <ValidationError errors={errors.name} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Pet Type')}</Form.Label>
                      <Form.Select
                        defaultValue={'Cat'}
                        className='form-control'
                        name='pet_type'
                        {...register("pet_type", { required: true })}>
                        {petType.map(type => <option value={type} key={type}>{t(type)}</option>)}
                      </Form.Select>
                      <ValidationError errors={errors.pet_type} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Breed')}</Form.Label>
                      <Form.Control
                        type='text'
                        name='breed'
                        label={t('Breed')}
                        placeholder={t("Enter Breed")}
                        isInvalid={Boolean(errors.breed)}
                        {...register('breed')}
                      />
                      <ValidationError errors={errors.breed} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Location")}</Form.Label>
                      <Form.Control
                        name='location'
                        type='text'
                        label={t('Location')}
                        placeholder={t("Enter Location")}
                        isInvalid={Boolean(errors.location)}
                        {...register('location', { required: true })}
                      />
                      <ValidationError errors={errors.location} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Animal Type')}</Form.Label>
                      <Form.Select
                        defaultValue={'Wild'}
                        className='form-control'
                        name='animal_type'
                        {...register("animal_type", { required: true })}>
                        {animalType.map(type => <option value={type} key={type}>{t(type)}</option>)}
                      </Form.Select>
                      <ValidationError errors={errors.animal_type} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Age")}</Form.Label>
                      <Form.Control
                        name='age'
                        type='number'
                        label={t('Age')}
                        placeholder={t("Enter Age")}
                        isInvalid={Boolean(errors.age)}
                        {...register('age', { required: true })}
                      />
                      <ValidationError errors={errors.age} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Weight")}</Form.Label>
                      <Form.Control
                        name='weight'
                        type='number'
                        label={t('Weight')}
                        placeholder={t("Enter Weight")}
                        isInvalid={Boolean(errors.weight)}
                        {...register('weight', { required: true })}
                      />
                      <ValidationError errors={errors.weight} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Gender')}</Form.Label>
                      <Form.Select
                        defaultValue={"Female"}
                        className='form-control'
                        name='gender'
                        {...register("gender", { required: true })}>
                        {animalGender.map(gender => <option value={gender} key={gender}>{t(gender)}</option>)}
                      </Form.Select>
                      <ValidationError errors={errors.gender} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className='d-block mb-4'>{t('Passport Available')}</Form.Label>
                      {passportAvailable.map(type =>
                        <Form.Check
                          key={"key-" + type.value}
                          className='d-inline-block me-4'
                          value={type.value}
                          name='passport_available'
                          type={'radio'}
                          label={t(type.name)}
                          id={`passport_available-${type.value}`}
                          {...register("passport_available")}
                        />
                      )}
                      <ValidationError errors={errors.passport_available} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={2}>
                    <Form.Group md={6}>
                      <Form.Label>{t("Previous Diseases")}</Form.Label>
                      <Form.Control
                        name='previous_diseases'
                        type='text'
                        label={t('Previous Diseases')}
                        placeholder={t("Enter Previous Diseases")}
                        isInvalid={Boolean(errors.previous_diseases)}
                        {...register('previous_diseases', { maxLength: { value: 255 } })}
                      />
                      <ValidationError errors={errors.previous_diseases} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className='d-block mb-4'>{t('Vaccinations')}</Form.Label>
                      {vaccinations.map(type =>
                        <Form.Check
                          key={"keys-" + type.value}
                          className='d-inline-block me-4'
                          value={type.value}
                          name='vaccinations'
                          type={'radio'}
                          label={t(type.name)}
                          id={`vaccinations-${type.value}`}
                          {...register("vaccinations")}
                        />
                      )}
                      <ValidationError errors={errors.passport_available} />
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