import React from 'react'
import { capitalize } from '@/core/utils/format'
import { useTranslation } from 'next-i18next'

const ValidationError = ({ errors, id }) => {
  const {t} = useTranslation('common');
  return <>
    {
      errors &&
      <div
        style={{ fontSize: "12px" }}
        className='text-start text-danger'
        id={id}
      >
        {t(errors?.message ? capitalize(errors.message) : capitalize(errors))}
      </div>
    }
  </>
}

export default ValidationError