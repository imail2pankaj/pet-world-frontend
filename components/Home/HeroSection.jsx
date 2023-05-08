import React from 'react'

const HeroSection = () => {
  return (
    <header className='home-header'>      
      <div className=''><img src={`/header-1.jpg`} alt={"Header"} /></div>
        <div className='caption'>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-black'>
              <h1 className='mb-3'>Foundation</h1>
              <img src={`/logo-en.png`} alt={"Logo"} />
              <h4 className='my-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</h4>
              <a className='button-1' href='#!' role='button'>
              <img src={`/subscribe-icon.png`} alt={"Subscribe"} /> Subscribe
              </a>
            </div>
          </div>
        </div>      
    </header>
  )
}

export default HeroSection