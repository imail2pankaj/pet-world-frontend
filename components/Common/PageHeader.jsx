import React from 'react'

const PageHeader = ({ banner, title }) => {
  return (
    <div className='header'>
      <div><img src={banner} alt={title} /></div>
      <h3>{title}</h3>
    </div>
  )
}

export default PageHeader