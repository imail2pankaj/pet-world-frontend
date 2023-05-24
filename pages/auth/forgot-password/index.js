import Link from 'next/link'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Alert, Button, Form } from "react-bootstrap";
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ValidationError from '@/components/Common/ValidationError';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import PrimarySubmit from '@/components/Common/PrimarySubmit';


const schema = yup.object().shape({
  email: yup.string().email().required()
})

const defaultValues = {
  email: ''
}

const ForgotPassword = () => {

  const auth = useAuth();
  const [serverResponse, setServerResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { email } = data
    setIsLoading(true);
    setServerResponse("");
    auth.forgetPassword({ email }, (resp) => {
      if (resp?.response?.data?.error) {
        toast.error(resp?.response?.data?.error)
        setServerResponse({
          variant: "danger",
          message: resp?.response?.data?.error
        })
      } else {
        setServerResponse({
          variant: "success",
          message: resp?.data?.message
        })
        reset();
      }
      setIsLoading(false);
    })
  }
  return (
    <>
      <NextSeo title='Forgot Password' openGraph={{ title: "Forgot Password" }} />
      <Container fluid="xxl">
        <div className='login-main'>
          <h2>Forgot Password</h2>
          <div className="mb-3 mt-4 lg-3">
            <div className="mb-3">
              {serverResponse && <Alert variant={serverResponse.variant}>{serverResponse.message}</Alert>}
              <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        autoFocus
                        label='Email'
                        placeholder="Enter Email"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.email} />
                </Form.Group>
                <div className="mb-5">
                  <PrimarySubmit isLoading={isLoading} text='Submit' />
                </div>
              </Form>
              <div className="already mt-3">
                Already registered? {" "} <Link href={`/auth/login`}><b>Login</b></Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ForgotPassword