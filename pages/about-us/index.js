import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AboutUs = () => {
  return (
    <div className='inner-main'>
        <div className='header'>
            <div><img src={`/aboutus-bg.jpg`} alt={"Header"} /></div>
            <h3>About us</h3>
        </div>
        
        <Container fluid="xxl">
          <div className='statistic-main' style={{backgroundImage:`url(/statestic-bg.svg)`}}>
            <div className='pic'><img src={`/statestic-img.png`} alt={"Pic"} /></div>
              <ul className='divider' style={{backgroundImage:`url(/paw-1.png)`}}>
                <li>
                  <span>$13m+</span>
                  Donation
                  <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
                </li>          
                <li>
                  <span>100+</span>
                  Doctors
                  <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
                </li>
                <li>
                  <span>185+</span>
                  Campaigns
                  <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
                </li>
                <li>
                  <span>15k+</span>
                  Donors
                  <div className='divider' style={{backgroundImage:`url(/divider.png)`}}></div>
                </li>
                <li>
                  <span>10k+</span>
                  Pets saved
                </li>
              </ul>
          </div>
          <div className='about-us-main'>
            <div className='about-details'>
              <div className='about-img'>
                <img src={`/aboutus-pic.png`} alt={"About us"}/>                
              </div>
              <h2 className='title'>
                <span>About</span>
                PetWorld
              </h2>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con sequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
              <p><b>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</b></p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesettin g, remaining essentially unchanged.</p>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor amet consectetur adipiscing.
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor sit sed do eiusmod tempor.
              </span>
              <span className='bullet-point'>
                <img src={`/bullet.png`} alt={""} /> Lorem ipsum consectetur adipiscing elit tempor.
              </span>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>

            <div className='team-main'>
              <h2 className='title'>
                <span>Meet our</span>Founders
              </h2>
              <div className='team-members-main'>
                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-1.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Founders</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>

                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-2.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Founders</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>

                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-3.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Founders</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>
              </div>

              <h2 className='title'>
                <span>Meet our</span>Team Members
              </h2>
              <div className='team-members-main'>
                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-4.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Employee</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>

                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-5.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Employee</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>

                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-6.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Employee</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>

                <div className='team-member'>
                  <div className='thumb'>
                    <img src={`/team-member-7.png`} alt={""} />
                  </div>
                  <div className='member-details'>
                    <h4>Team member’s name</h4>
                    <div className='designation'>Employee</div>
                    <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                    <div className='social'><a href='#'><img src={`/fb-icon2.png`} alt={"Facebbok"} /></a> <a href='#'><img src={`/tw-icon2.png`} alt={"Twitter"} /></a> <a href='#'><img src={`/in-icon2.png`} alt={"linkedin"} /></a> <a href='#'><img src={`/insta-icon2.png`} alt={"instagram"} /></a></div>
                  </div>
                </div>                
              </div>
            </div>
          </div>
        </Container>
        

        <div className='why-choose-us'>
                <Container fluid="xxl">
                    <Row>
                        <h2 className='title'>Why Vet choose PetWorld</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br /> tempor incididunt ut labore</p>
                    </Row>
                    <Row>
                        <Col sm={6} lg={4}>
                            <div className='icon'>
                                <img src={`/icon1.svg`} alt={"Icon"} />
                            </div>
                            <h3>
                                Sed ut perspiciatis
                            </h3>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                            </p>
                        </Col>
                        <Col sm={6} lg={4}>
                            <div className='icon'>
                                <img src={`/icon2.svg`} alt={"Icon"} />
                            </div>
                            <h3>
                                Sed ut perspiciatis
                            </h3>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                            </p>
                        </Col>
                        <Col sm={6} lg={4}>
                            <div className='icon'>
                                <img src={`/icon3.svg`} alt={"Icon"} />
                            </div>
                            <h3>
                                Sed ut perspiciatis
                            </h3>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                            </p>
                        </Col>
                        <Col sm={6} lg={4}>
                            <div className='icon'>
                                <img src={`/icon4.svg`} alt={"Icon"} />
                            </div>
                            <h3>
                                Sed ut perspiciatis
                            </h3>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                            </p>
                        </Col>
                        <Col sm={6} lg={4}>
                            <div className='icon'>
                                <img src={`/icon5.svg`} alt={"Icon"} />
                            </div>
                            <h3>
                                Sed ut perspiciatis
                            </h3>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                            </p>
                        </Col>
                        <Col sm={6} lg={4}>
                            <div className='icon'>
                                <img src={`/icon6.svg`} alt={"Icon"} />
                            </div>
                            <h3>
                                Sed ut perspiciatis
                            </h3>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
    </div>
  )
}

export default AboutUs