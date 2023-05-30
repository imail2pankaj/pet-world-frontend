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
  user_type_id: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  password_confirmation: yup.string().min(8, "Password length should be at least 8 characters").required().oneOf([yup.ref("password")], "Passwords do not match")
})

const defaultValues = {
  user_type_id: "3",
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const userTypes = [
  { id: "3", name: 'As a Donor' }, { id: "4", name: 'As a Doctor' }
]

const Register = () => {

  const router = useRouter();
  const auth = useAuth();
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
    auth.register(data, (err) => {
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
        toast.error(err?.response?.data?.error ? err?.response?.data?.error : 'Something went wrong, please try again');
        setServerResponse({
          variant: "danger",
          message: err?.response?.data?.error
        })
      } else {
        reset();
        toast.success(err?.message);
        setServerResponse({
          variant: "success",
          message: err?.message
        })
        router.push('/auth/welcome')
      }
      setIsLoading(false);
    })
  }

  return (
    <>
      <NextSeo title='Registration' openGraph={{ title: "Registration" }} />
      <Container fluid="xxl">
        <div className='login-main'>
          <h2>Sign up to <b>PetWorld</b></h2>
          <div className="mb-3 mt-4 lg-3">
            <div className="mb-3">
              {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                {serverResponse.message}
              </Alert>}
              <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="user_type_id">
                  {userTypes.map(type =>
                    <Form.Check
                      key={"key-" + type.id}
                      className='d-inline-block me-4'
                      value={type.id}
                      name='user_type_id'
                      type={'radio'}
                      label={type.name}
                      id={`user_type_id-${type.id}`}
                      {...register("user_type_id", {
                        required: "Please select your user type"
                      })}
                    />
                  )}
                </Form.Group>
                <ValidationError errors={errors.user_type_id} />
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

                <Form.Group className="mb-4" controlId="input-password">
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        label='Password'
                        placeholder="Enter Password"
                        type='password'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.password} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="input-confirm-password">
                  <Controller
                    name='password_confirmation'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        label='Confirm Password'
                        placeholder="Enter Confirm Password"
                        type='password'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.password_confirmation} />
                </Form.Group>
                <div className="mb-5">
                  <PrimarySubmit isLoading={isLoading} text='Sign Up' />
                </div>
              </Form>
              <Form.Group className="mb-4" controlId="formBasicCheckbox">
                You agree with the <Link className='tc' href={`/pages/terms`}><b>Terms & Conditions</b></Link> and <Link className='tc' href={`/pages/privacy`}><b>Data policy</b></Link>.
              </Form.Group>
              <div className="already mt-3">
                Already registered?{" "} <Link href={`/auth/login`}><b>Login</b></Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

Register.getLayout = page => {page}
Register.guestGuard = true
export default Register