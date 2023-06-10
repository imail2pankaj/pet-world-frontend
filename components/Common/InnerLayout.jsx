import { NextSeo } from 'next-seo'
import React from 'react'
import { Container } from 'react-bootstrap'
import { InnerNavbar } from '.'

const InnerLayout = ({ children, title, openGraph }) => {
  return (
    <>
      <NextSeo title={title} openGraph={openGraph} />
      <Container fluid="xxl">
        <InnerNavbar />
        {children}
      </Container>
    </>
  )
}

export default InnerLayout