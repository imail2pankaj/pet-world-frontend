import React from 'react'
import { capitalize } from '@/core/utils/format'

const ValidationError = ({ errors, id }) => {
  return <>
    {
      errors &&
      <div
        style={{ fontSize: "12px" }}
        className='text-start text-danger'
        id={id}
      >
        {errors?.message ? capitalize(errors.message) : capitalize(errors)}
      </div>
    }
  </>
}

export default ValidationError