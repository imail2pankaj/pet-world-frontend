import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const PrimarySubmit = ({isLoading, text = "Submit"}) => {
  return (
    <div>
      <Button className='button-1' variant="primary" type="submit">
        {isLoading && <Spinner size="sm" className='me-2' />}
        {text}
      </Button>
    </div>
  )
}

export default PrimarySubmit