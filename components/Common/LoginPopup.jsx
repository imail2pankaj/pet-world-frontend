import { useAuth } from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import PrimarySubmit from './PrimarySubmit';
import ValidationError from './ValidationError';
import { toast } from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const defaultValues = {
  email: '',
  password: '',
}

const LoginPopup = (props) => {
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
        props.hideLogin(false);
        setServerResponse({
          variant: "success",
          message: "You have successfully logged in"
        })
        reset();
      }
    })
  }
  return (
    <div className='event-popup'>
      <div className='modal-body'>
        <Button onClick={props.onHide}><img src={`/close.png`} alt={""} /></Button>
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
                <div>
                  <PrimarySubmit isLoading={isLoading} text='Login' />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup