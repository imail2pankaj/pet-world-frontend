import Image from 'next/image'
import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
      <Image src={"/logo-en.png"} width={180} height={30} alt='loading' />
      <Spinner />
    </div>
  )
}

export default Loader