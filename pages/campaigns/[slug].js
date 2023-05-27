import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { WhyVetChoosePetWorld } from '@/components/Common';
import Link from 'next/link';

const CampaignDetails = () => {
  return (
    <div className='inner-main'>
      <div className='header'>
        <div><img src={`/campaign-bg.jpg`} alt={"Header"} /></div>
        <h3>Campaigns</h3>
      </div>
      <div className='campaigns-detail'>
        <Container fluid="xxl">
          <Row>
            <div className='title'>
              <h2>Campaign Name</h2>
              <div className='total-collection'>
                <span>$25,000.83 raised</span> of $50,000
                <ProgressBar now={60} />
              </div>
            </div>
          </Row>
          <Row className='gallery'>
            <Col sm={6} lg={6}>
              <div className='video'>
                <img src={`/video-img.jpg`} alt={"Video"} />
                <Link className='play-button' href='#'>
                  <img src={`/play-icon.png`} alt={"Play"} />
                </Link>
              </div>
            </Col>
            <Col sm={6} lg={6}>
              <div className='img-gallery'>
                <div className='thumb'><img src={`/pic-1.jpg`} alt={""} /></div>
                <div className='thumb'><img src={`/pic-2.jpg`} alt={""} /></div>
                <div className='thumb'><img src={`/pic-3.jpg`} alt={""} /></div>
                <div className='thumb'><img src={`/pic-4.jpg`} alt={""} />
                  <Link href='#' className='overlay'>+12</Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='donorlist-disc'>
            <div className='donorlist'>
              <div className='buttons'>
                <Link href='#'>buttons</Link>
                <Link href='#' className='share-btn'>Share</Link>
              </div>

              <div className='score'>
                <div className='donors'>
                  <span>2,000</span>
                  Donors
                </div>
                <div className='donors subscrib'>
                  <span>100</span>
                  Subscriptions
                </div>
              </div>
              <ul>
                <li>
                  <div className='thumb'>
                    <img src={`/donor-pic.jpg`} alt={""} />
                  </div>
                  <div className='donor-name'>
                    Sed ut perspiciatis
                    <span>€25</span>
                  </div>
                  <div className='time'>4 Hours</div>
                </li>
                <li>
                  <div className='thumb'>
                    <img src={`/donor-pic.jpg`} alt={""} />
                  </div>
                  <div className='donor-name'>
                    Sed ut perspiciatis
                    <span>€40</span>
                  </div>
                  <div className='time'>Mar 23</div>
                </li>
                <li>
                  <div className='thumb'>
                    <img src={`/donor-pic.jpg`} alt={""} />
                  </div>
                  <div className='donor-name'>
                    Sed ut perspiciatis
                    <span>€50</span>
                  </div>
                  <div className='time'>Mar 20</div>
                </li>
                <li>
                  <div className='thumb'>
                    <img src={`/donor-pic.jpg`} alt={""} />
                  </div>
                  <div className='donor-name'>
                    Sed ut perspiciatis
                    <span>€65</span>
                  </div>
                  <div className='time'>Mar 18</div>
                </li>
                <li>
                  <div className='thumb'>
                    <img src={`/donor-pic.jpg`} alt={""} />
                  </div>
                  <div className='donor-name'>
                    Sed ut perspiciatis
                    <span>€35</span>
                  </div>
                  <div className='time'>Mar 15</div>
                </li>
                <li className='center'>
                  <Link href='#' className='more-list'>MORE</Link>
                </li>
              </ul>
            </div>
            <div className='description'>
              <h3>Sed ut perspiciatis</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at</p>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. </p>
            </div>
          </Row>
        </Container>

        <div className='campaign-info'>
          <Container fluid="xxl">
            <h3>Campaign Information</h3>
            <ul>
              <li>
                <div className='info-title'><img src={`/address-icon3.png`} alt={"Location"} /> Location</div>
                <div className='info-details'>Lorem Epsum</div>
              </li>
              <li>
                <div className='info-title'><img src={`/caregory-icon.png`} alt={"Location"} /> Category</div>
                <div className='info-details'>Dummy text</div>
              </li>
              <li>
                <div className='info-title'><img src={`/disease-icon.png`} alt={"Location"} /> Disease</div>
                <div className='info-details'>Lorem Epsum text</div>
              </li>
              <li>
                <div className='info-title'><img src={`/purpose-icon.png`} alt={"Location"} /> Campaign purpose</div>
                <div className='info-details'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
              </li>
              <li>
                <div className='info-title'><img src={`/home-icon.png`} alt={"Location"} /> Institution</div>
                <div className='info-details'>Lorem Ipsum is simply of the printing and typesetting.</div>
              </li>
            </ul>
          </Container>
        </div>

        <div className='comments-main'>
          <Container fluid="xxl">
            <h3>Comments (851)</h3>
            <div className='comment-box'>
              <div className='thumb'>
                <img src={`/donor-pic.jpg`} alt={""} />
              </div>
              <h4>Lorem Ipsum is simply dummy</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
              <div className='donate-time'>donate <span>$50</span>
                <div className='time'>4 hours</div>
              </div>
            </div>
            <div className='comment-box'>
              <div className='thumb'>
                <img src={`/donor-pic.jpg`} alt={""} />
              </div>
              <h4>Lorem Ipsum is simply dummy</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
              <div className='donate-time'>donate <span>$20</span>
                <div className='time'>4 hours</div>
              </div>
            </div>
            <div className='comment-box'>
              <div className='thumb'>
                <img src={`/donor-pic.jpg`} alt={""} />
              </div>
              <h4>Lorem Ipsum is simply dummy</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
              <div className='donate-time'>donate <span>$40</span>
                <div className='time'>4 hours</div>
              </div>
            </div>
            <div className='comment-box'>
              <div className='thumb'>
                <img src={`/donor-pic.jpg`} alt={""} />
              </div>
              <h4>Lorem Ipsum is simply dummy</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
              <div className='donate-time'>donate <span>$15</span>
                <div className='time'>4 hours</div>
              </div>
            </div>
            <div className='comment-box'>
              <div className='thumb'>
                <img src={`/donor-pic.jpg`} alt={""} />
              </div>
              <h4>Lorem Ipsum is simply dummy</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
              <div className='donate-time'>donate <span>$30</span>
                <div className='time'>4 hours</div>
              </div>
            </div>
            <div className='comment-box'>
              <div className='thumb'>
                <img src={`/donor-pic.jpg`} alt={""} />
              </div>
              <h4>Lorem Ipsum is simply dummy</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
              <div className='donate-time'>donate <span>$25</span>
                <div className='time'>4 hours</div>
              </div>
            </div>
            <div className='more'>
              <Link href='#' className='more-list'>MORE</Link>
            </div>
          </Container>
        </div>

        <WhyVetChoosePetWorld />
      </div>
    </div>
  )
}

export default CampaignDetails