import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { PrimarySubmit, ValidationError } from '@/components/Common'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, Container, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth';
import ReactDatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
const defaultAvatar = '/default-avatar.png';

const schema = yup.object().shape({
  first_name: yup.string().required(),
  surname: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Please enter valid phone number'),
})

const defaultValues = {
  first_name: '',
  surname: '',
  last_name: '',
  email: '',
  phone: '',
  username: '',
  profile_image: '',
  dob: '',
  location: '',
  gender: '',
}

const Profile = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [inputValue, setInputValue] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [imgSrc, setImgSrc] = useState(defaultAvatar)
  const { getProfileData, profileUpdate } = useAuth();

  useEffect(() => {

    const fetchProfile = async () => {
      try {

        const data = await getProfileData();
        const user = data.data;

        for (const key in defaultValues) {
          if (key === 'dob') {
            setValue(key, user[key] ? new Date(user[key]) : "");
            setDateOfBirth(user[key] ? new Date(user[key]) : "")
          } else if (key === 'profile_image') {
            setImgSrc(user[key] ? user[key] : defaultAvatar);
          } else {
            setValue(key, user[key] ? user[key] : "");
          }
        }
      } catch (error) {
        router.push('/auth/login');
      }
    }
    fetchProfile()

  }, [])

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
    const formData = {
      ...data,
      profile_image: profileImage
    }

    profileUpdate(formData, (err) => {
      if (err?.response?.data?.errors) {
        toast.error(err?.response?.data?.message ? err?.response?.data?.message : 'Something went wrong, please try again');
        Object.keys(err?.response?.data.errors).forEach((key) => {
          const error = err?.response?.data.errors;
          setServerResponse({
            variant: "danger",
            message: err?.response?.data?.message
          })
          setError(key, {
            type: "server",
            message: error[key][0]
          });
        });
      } else {
        toast.success(err?.data?.message);
        setServerResponse({
          variant: "success",
          message: err?.data?.message
        })
      }
      setIsLoading(false);
    })
  }
  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        setImgSrc(reader.result)
        setProfileImage(reader.result)
      }

      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  return (
    <>
      <NextSeo title={t('Profile Update')} openGraph={{ title: t('Profile Update') }} />
      <Container fluid="xxl">
        <div className='edit-profile'>
          <div className='form'>
            <h2>{t("Profile")} <b>{t("Update")}</b></h2>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                  {t(serverResponse.message)}
                </Alert>}
                <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className='mb-5'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className='pro-pic'>
                        <Image width={100} height={100} className='me-4' src={imgSrc} alt='Profile Pic' />
                      </div>
                      <div className='upload-btn'>
                        <Button variant='' style={{ padding: 0 }} htmlFor='account-settings-upload-image'>
                          <Form.Label style={{ paddingLeft: 20, paddingRight: 20, cursor: "pointer" }} htmlFor="account-settings-upload-image" className='m-0' >{t('Upload New Photo')}</Form.Label>
                          <Form.Control
                            hidden
                            type='file'
                            // value={inputValue}
                            accept='image/png, image/jpeg'
                            onChange={handleInputImageChange}
                            id='account-settings-upload-image'
                          />
                        </Button>
                      </div>
                    </div>
                    <ValidationError errors={errors.profile_image} />
                  </Form.Group>
                  <Row xs={1} md={3}>
                    <Form.Group>
                      <Form.Label>{t('First Name')}</Form.Label>
                      <Form.Control
                        name='first_name'
                        label={t('First Name')}
                        placeholder={t('Enter First Name')}
                        isInvalid={Boolean(errors.first_name)}
                        {...register('first_name', { required: true, minLength: { value: 3 } })}
                      />
                      <ValidationError errors={errors.first_name} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Surname')}</Form.Label>
                      <Form.Control
                        name='surname'
                        label={t('Surname')}
                        placeholder={t('Enter Surname')}
                        isInvalid={Boolean(errors.surname)}
                        {...register('surname', { required: true, minLength: { value: 3 } })}
                      />
                      <ValidationError errors={errors.surname} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Last Name')}</Form.Label>
                      <Form.Control
                        name='last_name'
                        label={t('Last Name')}
                        placeholder={t('Enter Last Name')}
                        isInvalid={Boolean(errors.last_name)}
                        {...register('last_name', { required: true, minLength: { value: 3 } })}
                      />
                      <ValidationError errors={errors.last_name} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={2}>
                    <Form.Group>
                      <Form.Label>{t('Email')}</Form.Label>
                      <Form.Control
                        readOnly
                        name='email'
                        type='email'
                        label={t('Email')}
                        placeholder={t('Enter Email')}
                        isInvalid={Boolean(errors.email)}
                        {...register('email', { required: true, email: true })}
                      />
                      <ValidationError errors={errors.email} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Username')}</Form.Label>
                      <Form.Control
                        readOnly
                        name='username'
                        label={t('Username')}
                        placeholder={t('Enter Username')}
                        isInvalid={Boolean(errors.username)}
                        {...register('username', { required: true })}
                      />
                      <ValidationError errors={errors.username} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Date of Birth')}</Form.Label>
                      <ReactDatePicker
                        name='dob'
                        showYearDropdown
                        showMonthDropdown
                        className='form-control'
                        placeholder={t('Select Date of Birth')}
                        dateFormat="dd/MM/yyyy"
                        selected={dateOfBirth}
                        onChange={(date) => { setValue('dob', date); setDateOfBirth(date) }}
                      />
                      <ValidationError errors={errors.dob} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Phone')}</Form.Label>
                      <Form.Control
                        className='form-control'
                        type="tel"
                        label={t('Phone')}
                        name="phone"
                        placeholder='1 234 567 8900'
                        maxLength={16}
                        // value={}
                        {...register("phone", { required: true, })}
                      />
                      <ValidationError errors={errors.phone} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Location')}</Form.Label>
                      <Form.Control
                        type="text"
                        label={t('Location')}
                        name="location"
                        placeholder={t('Enter Location')}
                        {...register("location", { required: true })}
                      />
                      <ValidationError errors={errors.location} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Gender')}</Form.Label>
                      <Form.Select
                        className='form-control'
                        name='gender'
                        {...register("gender", { required: true })}>
                        <option value="Male">{t('Male')}</option>
                        <option value="Female">{t('Female')}</option>
                        <option value="Others">{t('Others')}</option>
                      </Form.Select>
                      <ValidationError errors={errors.gender} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <div className="mb-5">
                      <Button variant='primary' type='submit'>
                        {isLoading && <Spinner size='sm' className='me-2' />}
                        {t('Save')}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container >
    </>
  )
}

export default Profile

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