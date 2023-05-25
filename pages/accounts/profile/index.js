import React, { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { PrimarySubmit, ValidationError } from '@/components/Common'
import { Controller, useForm } from 'react-hook-form'
import { Button, Container, Form } from 'react-bootstrap'
import Image from 'next/image'

const defaultAvatar = '/default-avatar.png';

const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required()
})

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  username: '',
  profile_image: '',
  dob: '',
  address: '',
}

const Profile = () => {
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState()
  const [inputValue, setInputValue] = useState('')
  const [imgSrc, setImgSrc] = useState(defaultAvatar)

  const {
    control,
    register,
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
    setIsLoading(true);
    setServerResponse("");
    // auth.register(data, (err) => {
    //   if (err?.response?.data?.errors) {
    //     toast.error(err?.response?.data?.message ? err?.response?.data?.message : 'Something went wrong, please try again');
    //     Object.keys(err?.response?.data.errors).forEach((key) => {
    //       const error = err?.response?.data.errors;
    //       setServerResponse({
    //         variant: "danger",
    //         message: err?.response?.data?.message
    //       })
    //       setError(key, {
    //         type: "server",
    //         message: error[key][0]
    //       });
    //     });
    //   } else {
    //     reset();
    //     toast.success(err?.message);
    //     setServerResponse({
    //       variant: "success",
    //       message: err?.message
    //     })
    //   }
    //   setIsLoading(false);
    // })
  }
  return (
    <>
      <NextSeo title='Profile Update' openGraph={{ title: "Profile Update" }} />
      <Container fluid="xxl">
        <div>
          <h2>Profile Update</h2>
          <div className="mb-3 mt-4 lg-3">
            <div className="mb-3">
              {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                {serverResponse.message}
              </Alert>}
              <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="input-profile-image">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image width={100} height={100} className='me-4' src={'/default-avatar.png'} alt='Profile Pic' />
                    <div>
                      <Button variant='primary' htmlFor='account-settings-upload-image'>
                        Upload New Photo
                        <input
                          hidden
                          type='file'
                          // value={inputValue}
                          accept='image/png, image/jpeg'
                          // onChange={handleInputImageChange}
                          id='account-settings-upload-image'
                        />
                      </Button>
                    </div>
                  </div>
                  <ValidationError errors={errors.profile_image} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-first-name">
                  <Controller
                    name='first_name'
                    control={control}
                    rules={{ required: true }}
                    autoFocus
                    render={({ field: { value, onChange, ref } }) => (
                      <Form.Control
                        autoFocus
                        ref={ref}
                        label='First Name'
                        placeholder="Enter First Name"
                        isInvalid={Boolean(errors.first_name)}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.first_name} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-last-name">
                  <Controller
                    name='last_name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        label='Last Name'
                        placeholder="Enter Last Name"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.last_name} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-email">
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        readOnly
                        type="email"
                        label='Email'
                        placeholder="Enter Email"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.email} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-username">
                  <Controller
                    name='username'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        readOnly
                        type="ttext"
                        label='Username'
                        placeholder="Enter Username"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.username} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-dob">
                  <Controller
                    name='dob'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        readOnly
                        type="datetime"
                        label='DOB'
                        placeholder="Enter dob"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.dob} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-phone">
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        readOnly
                        type="phone"
                        label='Phone'
                        placeholder="Enter phone"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.phone} />
                </Form.Group>
                <div className="mb-5">
                  <Button variant='primary' type='submit'>
                    Sign Up
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile