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
  const [verificationStatus, setVerificationStatus] = useState({
    status: 'success',
    message: 'You have successfully registered. An email sent your registered email for the verification. Please verify your email and start creating campaign or start donating',
  })

  return (
    <>
      <NextSeo title='Welcome' openGraph={{ title: "Email Welcome" }} />
      <Container fluid="xxl">
        {verificationStatus &&
          (
            <div className='login-main '>
              <Image src={`/verification-success.webp`} height={100} width={100} className='mb-4' alt={`Registration success`} />
              <h2>Registration Success</h2>
              <div className="mb-3 mt-4 lg-3">
                <p>Congratulations, You have successfully registered. </p><p>An email sent your registered email for the verification. </p><p>Please verify your email and start creating campaign or start donating</p>
                <div className="mb-3">
                  <div className="already mt-3">
                    <Link href={`/auth/login`}><b>Login</b></Link>
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