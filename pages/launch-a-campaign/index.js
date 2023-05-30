import React from 'react'
import Container from 'react-bootstrap/Container';
import { PageHeader, WhyVetChoosePetWorld } from '@/components/Common';
import Link from 'next/link';


const LaunchACampaign = () => {
  return (
    <div className='inner-main'>
      <PageHeader banner={`/campaign-bg.jpg`} title={"Launch a Campaign"} />
      <Container fluid="xxl">
        <div className='launch-campaign-main'>
          <h2>Pet World is an extremely powerful and transparent fundraising tool for good causes.</h2>
          <div className='steps'>
            <div className='step'>
              <div className='step-picture'>
                <div className='picture'>
                  <img src={`/step-pic1.jpg`} alt={"Step 1"} />
                </div>
              </div>
              <div className='step-detail'>
                <div className='step-no'>Step <span>01.</span></div>
                <h4>Launch your campaign on Pet World</h4>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <div className='step-arrow'><img src={`/step-arw.png`} alt={"Step"} /></div>
              </div>
            </div>
            <div className='step'>
              <div className='step-picture'>
                <div className='picture'>
                  <img src={`/step-pic2.jpg`} alt={"Step 1"} />
                </div>
              </div>
              <div className='step-detail'>
                <div className='step-no'>Step <span style={{ color: '#9E0C0F' }}> 02.</span></div>
                <h4>Share your campaign with the world</h4>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <div className='step-arrow'><img src={`/step-arw.png`} alt={"Step"} /></div>
              </div>

            </div>
            <div className='step'>
              <div className='step-picture'>
                <div className='picture'>
                  <img src={`/step-pic3.jpg`} alt={"Step 1"} />
                </div>
              </div>
              <div className='step-detail'>
                <div className='step-no'>Step <span style={{ color: '#FF7F18' }}> 03.</span></div>
                <h4>Raise and withdraw funds quickly and easily</h4>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <div className='step-arrow'><img src={`/step-arw.png`} alt={"Step"} /></div>
              </div>

            </div>
            <div className='step'>
              <div className='step-picture'>
                <div className='picture'>
                  <img src={`/step-pic4.jpg`} alt={"Step 1"} />
                </div>
              </div>
              <div className='step-detail'>
                <div className='step-no'>Step <span style={{ color: '#0096EB' }}>04.</span></div>
                <h4>Your campaign is your personal relationship with the donors</h4>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
              </div>

            </div>
          </div>

          <div className="launch-campaign-btn">
            <Link className='button-1' href='#!' role='button'>Launch campaign</Link>
          </div>
        </div>

      </Container>

      <WhyVetChoosePetWorld />
    </div>
  )
}

export default LaunchACampaign