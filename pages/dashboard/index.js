import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'

const Dashboard = () => {
  const { t } = useTranslation()
  return (
    <>
      <ProtectedLayout title={t('Dashboard')} openGraph={{ title: t('Dashboard') }} >
        <div className='edit-profile'>
          <div className='form'>
            <Link href={'/dashboard/pets'}>Pets</Link>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default Dashboard