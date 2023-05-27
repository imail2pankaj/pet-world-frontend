import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className='about-main'>                    
            <div className='about-detail'>
              <h2 className='title'>
                <span>About</span>
              PetWorld
              </h2>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con sequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor amet consectetur adipiscing.
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor sit sed do eiusmod tempor.
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Lorem ipsum consectetur adipiscing elit tempor.
              </span>
              <Link className='button-1' href='/about-us' role='button'>
                Read More
              </Link>
            </div>      
            <div className='about-pic'><img src={`/about-pic.png`} alt={"About Pic"} /></div>
    </div>
  )
}

export default About