import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const LanguageOption = () => {
  const router = useRouter();

  const { t } = useTranslation('common')

  const changeTo = router.locale === 'en' ? 'bg' : 'en'

  return (
    <div className='flex gap-2 items-center'>
      <Link href="/" locale={changeTo}>
        <button>
          {t(changeTo, { changeTo }).toUpperCase()}
        </button>
      </Link>
    </div>
  )
}

export default LanguageOption