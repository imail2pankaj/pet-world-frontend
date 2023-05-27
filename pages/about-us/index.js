import React from "react"
import Container from "react-bootstrap/Container";
import { PageHeader, WhyVetChoosePetWorld } from "@/components/Common";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="inner-main">
      <PageHeader banner={`/aboutus-bg.jpg`} title={`About Us`} />

      <Container fluid="xxl">
        <div className="statistic-main" style={{ backgroundImage: `url(/statestic-bg.svg)` }}>
          <div className="pic"><img src={`/statestic-img.png`} alt={"Pic"} /></div>
          <ul className="divider" style={{ backgroundImage: `url(/paw-1.png)` }}>
            <li>
              <span>$13m+</span>
              Donation
              <div className="divider" style={{ backgroundImage: `url(/divider.png)` }}></div>
            </li>
            <li>
              <span>100+</span>
              Doctors
              <div className="divider" style={{ backgroundImage: `url(/divider.png)` }}></div>
            </li>
            <li>
              <span>185+</span>
              Campaigns
              <div className="divider" style={{ backgroundImage: `url(/divider.png)` }}></div>
            </li>
            <li>
              <span>15k+</span>
              Donors
              <div className="divider" style={{ backgroundImage: `url(/divider.png)` }}></div>
            </li>
            <li>
              <span>10k+</span>
              Pets saved
            </li>
          </ul>
        </div>
        <div className="about-us-main">
          <div className="about-details">
            <div className="about-img">
              <img src={`/aboutus-pic.png`} alt={"About us"} />
            </div>
            <h2 className="title">
              <span>About</span>
              PetWorld
            </h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con sequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
            <p><b>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</b></p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesettin g, remaining essentially unchanged.</p>
            <span className="bullet-point">
              <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor amet consectetur adipiscing.
            </span>
            <span className="bullet-point">
              <img src={`/bullet.png`} alt={""} /> Lorem ipsum dolor sit sed do eiusmod tempor.
            </span>
            <span className="bullet-point">
              <img src={`/bullet.png`} alt={""} /> Lorem ipsum consectetur adipiscing elit tempor.
            </span>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>

          <div className="team-main">
            <h2 className="title">
              <span>Meet our</span>Founders
            </h2>
            <div className="team-members-main">
              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-1.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Founders</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>

              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-2.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Founders</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>

              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-3.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Founders</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>
            </div>

            <h2 className="title">
              <span>Meet our</span>Team Members
            </h2>
            <div className="team-members-main">
              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-4.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Employee</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>

              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-5.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Employee</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>

              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-6.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Employee</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>

              <div className="team-member">
                <div className="thumb">
                  <img src={`/team-member-7.png`} alt={""} />
                </div>
                <div className="member-details">
                  <h4>Team member’s name</h4>
                  <div className="designation">Employee</div>
                  <p>Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard ever.</p>
                  <div className="social"><Link href="#"><img src={`/fb-icon2.png`} alt={"Facebbok"} /></Link> <Link href="#"><img src={`/tw-icon2.png`} alt={"Twitter"} /></Link> <Link href="#"><img src={`/in-icon2.png`} alt={"linkedin"} /></Link> <Link href="#"><img src={`/insta-icon2.png`} alt={"instagram"} /></Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>


      <WhyVetChoosePetWorld />
    </div>
  )
}

export default AboutUs