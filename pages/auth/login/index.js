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
import { useRouter } from 'next/router';


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const defaultValues = {
  email: '',
  password: '',
}

const Login = () => {

  const auth = useAuth();
  const [serverResponse, setServerResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { email, password } = data
    setIsLoading(true);
    setServerResponse("");
    auth.login({ email, password }, (response) => {
      setIsLoading(false);
      if (response?.response?.data?.error) {
        toast.error(response?.response?.data?.error)
        setServerResponse({
          variant: "danger",
          message: response?.response?.data?.error
        })
      } else {
        router.push('/accounts/profile')
        setServerResponse({
          variant: "success",
          message: "You have successfully logged in"
        })
        reset();
      }
    })
  }
  return (
    <>
      <NextSeo title='Login' openGraph={{ title: "Login" }} />
      <Container fluid="xxl">
        <div className='login-main'>
          <h2>Login to <b>PetWorld</b></h2>
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
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        label='Password'
                        placeholder="Enter Password"
                        type='password'
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.password} />
                </Form.Group>
                <div className="mb-5">
                  <PrimarySubmit isLoading={isLoading} text='Login' />
                </div>
              </Form>
              <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <Link href={`/auth/forgot-password`}><b>Forgotten password?</b></Link>
              </Form.Group>
              <div className="already mt-3">
                Not registered?{" "} <Link href={`/auth/register`}><b>Sign up</b></Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
Login.getLayout = page => {page}
Login.guestGuard = true
export default Login