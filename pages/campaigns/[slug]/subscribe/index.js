import React from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import * as yup from 'yup'
import { NextSeo } from 'next-seo';
import { Button, Col, Container, Form, Row, Tooltip } from 'react-bootstrap';
import { CampaignCard, CustomTooltip, ValidationError } from '@/components/Common';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cleave from 'cleave.js/react';


const defaultValues = {
  donate_amount: 0,
}

const Subscribe = ({ campaign, notFound }) => {

  const { t } = useTranslation();
  const router = useRouter();

  let openGraph = { images: [] };

  if (campaign) {
    openGraph = {
      ...campaign,
      title: `${campaign?.title}`,
      description: campaign?.short_description,
      // images: [{ url: campaign??.profile_image }]
    };
  }
  const requiredAmount = parseInt(campaign?.pet_owner_participation) ? (campaign?.goal_amount - ((campaign?.goal_amount * campaign?.pet_owner_participation) / 100)) : campaign?.goal_amount;
  // console.log(requiredAmount);
  const schema = yup.object().shape({
    donate_amount: yup.number("Please valid amount").min(1).max(requiredAmount).required(),
  })

  const {
    control,
    register,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = data => { }

  return (
    <>
      <NextSeo
        title={`Subscribe for ${campaign?.title}`}
        description={campaign?.short_description}
        openGraph={openGraph}
      />
      <div className='inner-main'>
        <div className='header'>
          <div><img src={`/campaign-bg.jpg`} alt={t("Subscribe")} /></div>
          <h3>{t("Subscribe")}</h3>
        </div>
        <div className='edit-profile campaigns-detail subscribe-now'>
          <Container fluid="xxl">
            <Row>
              <div className='title'>
                <h2>Subscribe for {campaign?.title}</h2>
              </div>
              <Row xs={12} md={6}>
                <Col sm={12} md={4}>
                  <CampaignCard campaign={campaign} />
                </Col>
                <Col sm={12} md={8}>
                  <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <h4>{t('Enter a subscription amount here')}</h4>
                    <div className='amount-wapper'>
                      <span className='currency'>€</span>
                      <Form.Control
                        type='number'
                        name='donate_amount'
                        className='subscription-amount'
                        {...register('donate_amount', { required: true })}
                      />
                      <div className='amount-suffix'>.00</div>
                    </div>
                    <ValidationError errors={errors.donate_amount} />
                    <div className='mt-2'>
                      You will be subscribed for monthly donations. {` `}
                      <CustomTooltip message='Donate monthly to <u>until the end of the campaign</u> to ensure quick fund raising. You can unsubscribe at any time.'><span><RxQuestionMarkCircled fontSize={25} /></span></CustomTooltip>
                    </div>
                    <div className='form' >
                      {/* <Cleave className='form-control' placeholder="Enter credit card number" options={{ creditCard: true, onCreditCardTypeChanged: onCreditCardTypeChanged }}
                        onChange={onCreditCardChange} /> */}

                      <div id="form-credit-card" className="row mt-4">
                        <div className="col-12 col-md-8 col-xl-12">
                          <div className="mb-3">
                            <label className="form-label w-100" for="creditCardMask">Card Number</label>
                            <div className="input-group input-group-merge">
                              {/* <input type="text" id="creditCardMask" name="creditCardMask" className="form-control credit-card-mask" placeholder="1356 3215 6548 7898" aria-describedby="creditCardMask2" /> */}
                              <Cleave className='form-control' placeholder="Enter credit card number" options={{ creditCard: true }} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="mb-3">
                                <label className="form-label" for="collapsible-payment-name">Name</label>
                                <input type="text" id="collapsible-payment-name" className="form-control" placeholder="John Doe" />
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="mb-3">
                                <label className="form-label" for="collapsible-payment-expiry-date">Exp. Date</label>
                                {/* <input type="text" id="collapsible-payment-expiry-date" className="form-control expiry-date-mask" placeholder="MM/YY" /> */}
                                <Cleave className='form-control' placeholder="MM/YY" options={{ date: true, delimiter: '/', datePattern: ['m', 'y'] }} />
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="mb-3">
                                <label className="form-label" for="collapsible-payment-cvv">CVV Code</label>
                                <div className="input-group input-group-merge">
                                  <Cleave className='form-control' placeholder="654" maxLength="3" options={{ numeral: true, numeralPositiveOnly: true }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row>
                    <div className="mt-3 mb-5">
                      <Button variant='primary' type='submit'>
                        Save
                      </Button>
                    </div>
                  </Row>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Subscribe

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