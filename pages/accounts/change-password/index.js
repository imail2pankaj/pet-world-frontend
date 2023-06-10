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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const defaultAvatar = '/default-avatar.png';

const schema = yup.object().shape({
  old_password: yup.string().required(),
  password: yup.string().required().min(8, "Password length should be at least 8 characters"),
  password_confirmation: yup.string().min(8, "Password length should be at least 8 characters").required().oneOf([yup.ref("password")], "Passwords do not match")
})

const defaultValues = {
  old_password: '',
  password: '',
  password_confirmation: ''
}
const ChangePassword = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { changePassword } = useAuth();

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

    changePassword(data, (err) => {

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
      } else if (err?.response?.data?.error) {
        setServerResponse({
          variant: "danger",
          message: err?.response?.data?.error
        })
      } else {
        reset();
        toast.success(err?.data?.message);
        setServerResponse({
          variant: "success",
          message: err?.data?.message
        })
      }
      setIsLoading(false);
    })
  }

  return (
    <>
      <NextSeo title={t('Change Password')} openGraph={{ title: t('Change Password') }} />
      <Container fluid="xxl">
        <div className='edit-profile'>
          <div className='form'>
            <h2>{t("Change")} <b>{t("Password")}</b></h2>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                  {t(serverResponse.message)}
                </Alert>}
                <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Row xs={1} md={3}>
                    <Form.Group>
                      <Form.Label>{t("Old Password")}</Form.Label>
                      <Form.Control
                        name='old_password'
                        type='password'
                        label={t("Old Password")}
                        placeholder={t("Enter Old Password")}
                        isInvalid={Boolean(errors.old_password)}
                        {...register('old_password', { required: true, minLength: { value: 8 } })}
                      />
                      <ValidationError errors={errors.old_password} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Password")}</Form.Label>
                      <Form.Control
                        name='password'
                        type='password'
                        label={t('Password')}
                        placeholder={t("Enter Password")}
                        isInvalid={Boolean(errors.password)}
                        {...register('password', { required: true, minLength: { value: 8 } })}
                      />
                      <ValidationError errors={errors.password} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Confirm Password')}</Form.Label>
                      <Form.Control
                        type='password'
                        name='password_confirmation'
                        label={t('Confirm Password')}
                        placeholder={t("Enter Confirm Password")}
                        isInvalid={Boolean(errors.password_confirmation)}
                        {...register('password_confirmation', { required: true, minLength: { value: 8 } })}
                      />
                      <ValidationError errors={errors.password_confirmation} />
                    </Form.Group>
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
      </Container >
    </>
  )
}

export default ChangePassword

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