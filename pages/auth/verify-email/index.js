import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NextSeo } from 'next-seo';


const VerifyEmail = () => {

  const { query: { token } } = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("")

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`)
        .then(response => {
          setVerificationStatus({
            status: 'success',
            message: "Thank you for your support, we have successfully verified your email address. You can now proceed to login."
          })
        }).catch(error => {
          setVerificationStatus({
            status: 'failed',
            message: error?.response?.data?.error
          })
        })
    } else {
      // setVerificationStatus({
      //   status: 'failed',
      //   message: "Could not verify you email, please try again."
      // })
    }
  }, [token])

  const auth = useAuth();

  return (
    <>
      <NextSeo title='Email Verification' openGraph={{ title: "Email Verification" }} />
      <Container fluid="xxl">
        {verificationStatus &&
          (
            <div className='login-main '>
              <Image src={`/verification-${verificationStatus.status}.webp`} height={100} width={100} className='mb-4' alt={`Verification ${verificationStatus.status}`} />
              <h2>Verification {verificationStatus.status}</h2>
              <div className="mb-3 mt-4 lg-3">
                <p>{verificationStatus.message}</p>
                <div className="mb-3">
                  <div className="already mt-3">
                    <Link href={`/login`}><b>Login</b></Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Container>
    </>
  )
}

export default VerifyEmail