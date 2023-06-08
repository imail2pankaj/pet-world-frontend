import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import axiosInstance from '@/store/api/axiosInstance';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


const VerifyEmail = () => {

  const { t } = useTranslation();
  const { query: { token } } = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("")

  useEffect(() => {
    if (token) {
      axiosInstance.get(`/auth/verify-email?token=${token}`)
        .then(() => {
          setVerificationStatus({
            status: 'success',
            message: "VERIFICATION_SUCCESS_MESSAGE"
          })
        }).catch(error => {
          setVerificationStatus({
            status: 'failed',
            message: error?.response?.data?.error
          })
        })
    }
  }, [token])

  return (
    <>
      <NextSeo title={t('Email Verification')} openGraph={{ title: t("Email Verification") }} />
      <Container fluid="xxl">
        {verificationStatus &&
          (
            <div className='login-main '>
              <Image src={`/verification-${verificationStatus.status}.webp`} height={100} width={100} className='mb-4' alt={t(`Verification ${verificationStatus.status}`)} />
              <h2>{t(`Verification ${verificationStatus.status}`)}</h2>
              <div className="mb-3 mt-4 lg-3">
                <p>{t(verificationStatus.message)}</p>
                <div className="mb-3">
                  <div className="already mt-3">
                    <Link href={`/auth/login`}><b>{t("Login")}</b></Link>
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

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        ['common']
      ])),
    },
    revalidate: 10,
  }
}