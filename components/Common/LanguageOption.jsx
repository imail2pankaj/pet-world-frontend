import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Form from 'react-bootstrap/Form';

const LanguageOption = () => {
  const router = useRouter();

  const { t } = useTranslation('common')

  const changeTo = router.locale === 'en' ? 'bg' : 'en'

  const handleRoute = (locale) => router.replace(router.asPath, router.asPath, { locale: locale })

  return (
    <div className='flex gap-2 items-center'>
      {/* <Link href={router.asPath} locale={changeTo}>
        <button>
          {t(changeTo, { changeTo }).toUpperCase()}
        </button>        
      </Link> */}
      <Form.Select
        defaultValue="English"
        value={router.locale}
        onChange={(e) => handleRoute(e.target.value)}
      >
        <option value={'en'}>English</option>
        <option value={'bg'}>Bulgarian</option>
      </Form.Select>
    </div>
  )
}

export default LanguageOption