import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Layout = ({children}) => {
  return (
    <div>
      header
      <Alert key={'dark'} variant={'dark'}>
          This is a {'dark'} alert with{' '}
          <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
          you like.
        </Alert>
      {children}
      Footer
    </div>
  )
}

export default Layout