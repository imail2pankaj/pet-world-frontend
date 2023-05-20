import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Alert, Button, Form } from "react-bootstrap";
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ValidationError from '@/components/Common/ValidationError';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';


const schema = yup.object().shape({
  password: yup.string().required().min(8, "Password length should be at least 8 characters"),
  confirm_password: yup.string().min(8, "Password length should be at least 8 characters").required().oneOf([yup.ref("password")], "Passwords do not match")
})

const defaultValues = {
  password: '',
  confirm_password: ""
}

const ResetPassword = () => {

  const { query: { token } } = useRouter();
  const router = useRouter()

  const auth = useAuth();
  const [serverResponse, setServerResponse] = useState('')

  const [tokenValid, setTokenValid] = useState({
    status: "",
    message: ""
  })

  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (token) {
      auth.validateResetPasswordToken(token, async (resp) => {

        if (resp?.status !== 200) {
          setTokenValid({
            status: "danger",
            message: <Alert variant='danger' >Invalid reset password link. Try <Link href="/auth/forget-password">forget password</Link> again</Alert>
          })
        } else if (resp?.status === 200) {
          setUserId(resp?.data?.data?.id);
        }
      });
    }
  }, [auth, token])

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
    const { password, confirm_password } = data
    setServerResponse("");
    console.log(userId, password, confirm_password);
    auth.resetPassword({ userId, password, confirm_password }, (resp) => {
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
        router.push('/auth/login');
      }
    })
  }
  return (
    <>
      <NextSeo title='Reset Password' openGraph={{ title: "Reset Password" }} />
      <Container fluid="xxl">
        <div className='login-main'>
          <h2>Reset Password</h2>
          <div className="mb-3 mt-4 lg-3">
            <div className="mb-3">
              {(tokenValid && tokenValid?.status === 'danger') && tokenValid?.message}
              {serverResponse && <Alert variant={serverResponse.variant}>{serverResponse.message}</Alert>}
              {tokenValid?.status === '' && (<Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="password">
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        autoFocus
                        type='password'
                        label='Password'
                        placeholder="Enter Password"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.password} />
                </Form.Group>
                <Form.Group className="mb-4" controlId="confirm_password">
                  <Controller
                    name='confirm_password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        type='password'
                        label='confirm_password'
                        placeholder="Enter Confirm Password"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ValidationError errors={errors.confirm_password} />
                </Form.Group>
                <div className="mb-5">
                  <Button className='button-1' variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>)}
              <div className="already mt-3">
                Already registered? {" "} <Link href={`/login`}><b>Login</b></Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ResetPassword