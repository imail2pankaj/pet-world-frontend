import { NextSeo } from 'next-seo'
import React from 'react'
import { Container } from 'react-bootstrap'
import ProtectedNavbar from './ProtectedNavbar'

const ProtectedLayout = ({ children, title, openGraph }) => {
  return (
    <>
      <NextSeo title={title} openGraph={openGraph} />
      <Container fluid="xxl">
        <ProtectedNavbar />
        {children}
      </Container>
    </>
  )
}

export default ProtectedLayout