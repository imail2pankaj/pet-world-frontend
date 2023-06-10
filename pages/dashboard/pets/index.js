import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

const Pets = () => {
  const { t } = useTranslation()

  const [columnDefs, setColumnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
  ]);

  return (
    <>
      <ProtectedLayout title={t('Pets')} openGraph={{ title: t('Pets') }}>
        <Link href={'/dashboard/pets/create'}>Create</Link>
        <div className='edit-profile'>
          <div className='form'>
            <h2>{t("Pets")}</h2>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {/* <AgGridReact columnDefs={columnDefs} /> */}
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default Pets

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
    revalidate: 100,
  }
}