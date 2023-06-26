import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CampaignShare, WhyVetChoosePetWorld } from '@/components/Common';
import Link from 'next/link';
import axiosInstance from '@/store/api/axiosInstance';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { BiCalendar, BiCategory, BiHeart } from 'react-icons/bi';
import { TbStethoscope } from 'react-icons/tb';
import { NextSeo } from 'next-seo';
import Error from 'next/error';
import { MdFacebook, MdOutlineVerifiedUser } from 'react-icons/md';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { formatCurrency } from '@/core/utils/format';
import axios from 'axios';

const CampaignDetails = ({ campaign, notFound }) => {

  const { t } = useTranslation();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const { user } = useAuth();

  if (notFound) {
    return <Error statusCode={404} />;
  }

  const url = `${process.env.NEXT_PUBLIC_URL}${router?.asPath}`;

  let openGraph = { images: [] };

  if (campaign) {
    openGraph = {
      ...campaign,
      title: `${campaign?.title}`,
      description: campaign?.short_description,
      // images: [{ url: campaign??.profile_image }]
    };
  }
  const isApproved = (requests) => {
    const totalRequests = requests.length;
    const approvedRequests = requests.filter(request => request.status == 1);
    return (approvedRequests.length !== totalRequests) && <div className='badge'><img src={`/not-approved-badge.png`} alt={""} /></div>
  }
  return (
    <>
      <NextSeo
        title={`${campaign?.title}`}
        description={campaign?.short_description}
        openGraph={openGraph}
      />
      <div className='inner-main'>
        <div className='header'>
          <div><img src={`/campaign-bg.jpg`} alt={t("Campaigns")} /></div>
          <h3>{t("Campaigns")}</h3>
        </div>
        <div className='campaigns-detail'>
          <Container fluid="xxl">
            <Row>
              <div className='title'>
                <h2>{campaign?.title}</h2>
                <div className='total-collection'>
                  <span>{t("Funds Required")}</span> - {formatCurrency(campaign?.goal_amount)}
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
                  {campaign?.media?.map((media, index) => <div key={index} className='thumb'><img src={media.name} alt={""} /></div>)}
                  {/* <div className='thumb'><img src={`/pic-4.jpg`} alt={""} />
                    <Link href='#' className='overlay'>+12</Link>
                  </div> */}
                </div>
              </Col>
            </Row>
            <Row className='donorlist-disc'>
              <div className='donorlist'>
                <div className='buttons' style={{ display: "flex" }}>
                  {user ? <Link href={`/campaigns/${campaign?.slug}/subscribe`}>{t("Subscribe")}</Link> : <Link href='/auth/login'>{t("Subscribe")}</Link>}
                  <CampaignShare shareUrl={url} />
                </div>

                <div className='score'>
                  <div className='donors'>
                    <span>2,000</span>
                    {t("Donors")}
                  </div>
                  <div className='donors subscrib'>
                    <span>100</span>
                    {t("Subscriptions")}
                  </div>
                </div>

                <div className='campaign-info'>
                  <h3>{t("Campaign Information")}</h3>
                  <ul>
                    <li>
                      <div className='info-title'><MdOutlineVerifiedUser fontSize={25} />  {t("Campaign Unique ID")}</div>
                      <div className='info-details'>{campaign?.unique_id}</div>
                    </li>
                    <li>
                      <div className='info-title'><BiCalendar fontSize={25} />  {t("Campaign Date")}</div>
                      <div className='info-details'>{campaign?.start_date ? campaign?.start_date : "N/A"}</div>
                    </li>
                    <li>
                      <div className='info-title'><BiCategory fontSize={25} /> {t("Category")}</div>
                      <div className='info-details'>{campaign?.category}</div>
                    </li>
                    <li>
                      <div className='info-title'><BiHeart fontSize={25} /> {t("Treatment")}</div>
                      <div className='info-details'>{campaign?.treatment}</div>
                    </li>
                    <li>
                      <div className='info-title'><TbStethoscope fontSize={25} /> {t("Campaign By")}</div>
                      <div className='info-details'><Link href={`/doctors/${campaign?.doctor?.username}`}>{campaign?.doctor?.first_name} {campaign?.doctor?.surname}</Link></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='description'>
                {isApproved(campaign?.approval)}
                <div className='d-inline' dangerouslySetInnerHTML={{ __html: showMore ? campaign?.description?.replace("\n", "<br/>") : campaign?.description?.replace("\n", "<br/>").substring(0,1200) }} />
                <Button className='d-inline p-0 ms-2' variant="link" onClick={() => setShowMore(!showMore)}>{showMore ? "Show Less" : "Show More"}</Button>
              </div>
            </Row>
          </Container>

          <div className='comments-main'>
            <Container fluid="xxl">
              <h3>Comments (851)</h3>
              {
                [1, 2, 3, 4, 5].map(item => (
                  <div key={item} className='comment-box'>
                    <div className='thumb'>
                      <img src={`/donor-pic.jpg`} alt={""} />
                    </div>
                    <h4>Lorem Ipsum is simply dummy</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown. </p>
                    <div className='donate-time'>
                      <div className='time'>4 hours</div>
                    </div>
                  </div>
                ))
              }
              <div className='more'>
                <Link href='#' className='more-list'>{t("MORE")}</Link>
              </div>
            </Container>
          </div>

          <WhyVetChoosePetWorld />
        </div>
      </div>
    </>
  )
}

export default CampaignDetails

export async function getServerSideProps({ locale, params }) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/${params.slug}/details`);
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      campaign: response?.data
    }
  }
}