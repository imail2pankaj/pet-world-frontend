import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import * as yup from 'yup'
import { NextSeo } from 'next-seo';
import { Button, Col, Container, Form, Row, Spinner, Tooltip } from 'react-bootstrap';
import { CampaignCard, CustomTooltip, ValidationError } from '@/components/Common';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cleave from 'cleave.js/react';
import { useDispatch } from 'react-redux';
import { subscribe } from '@/store/api/subscription';
import { error } from 'jquery';
import { toast } from 'react-hot-toast';

const defaultValues = {
  donate_amount: 0,
  card_holder_name: "",
  expiry_date: "",
  cvc: "",
  campaign_id: 0
}

const Subscribe = ({ campaign, notFound }) => {

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

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

  const schema = yup.object().shape({
    donate_amount: yup.number("Please valid amount").integer().min(1).max(requiredAmount).required(),
    card_holder_name: yup.string().min(1).max(255).required(),
    credit_card_number: yup.string().required(),
    expiry_date: yup.string().required(),
    cvc: yup.string().required(),
  })

  useEffect(() => {

    if (campaign) {
      setValue("campaign_id", campaign?.id);
    }

  }, [campaign])

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

  const onSubmit = data => {
    setLoading(true);
    dispatch(subscribe(data)).then(response => {
      setLoading(false);
      toast.success(`You have successfully subscribed for the ${campaign?.title} campaign.`)
      reset();
      router.push("/dashboard");
    }).catch(error => {
      setLoading(false);
    });
  }

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
                <Col sm={12} md={4} className='doctors-main m-0'>
                  <div className='doctor-list m-0'>
                    <CampaignCard campaign={campaign} />
                  </div>
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
                      <CustomTooltip message='Donate monthly to until the end of the campaign to ensure quick fund raising. You can unsubscribe at any time.'><span><RxQuestionMarkCircled fontSize={25} /></span></CustomTooltip>

                      <p className='mt-4'>PetWorld Foundation is free for the campaign (0%) and relies entirely on your generosity to sustain and grow.</p>

                      <p className='mt-4'>I would like to donate for PetWorld Foundation</p>

                    </div>
                    <div className='form' >
                      <div id="form-credit-card" className="row mt-4">
                        <div className="col-12 col-md-8 col-xl-12">
                          <div className="mb-3">
                            <label className="form-label w-100" htmlFor="creditCardMask">Card Number</label>
                            <div className="input-group input-group-merge">
                              <Cleave
                                name='credit_card_number'
                                className='form-control'
                                placeholder="Enter credit card number"
                                onChange={(e) => {
                                  setValue('credit_card_number', e.target.rawValue)
                                }}
                                options={{
                                  creditCard: true,
                                }}
                              // {...register('credit_card_number', { required: true })}
                              />
                            </div>
                            <ValidationError errors={errors.credit_card_number} />
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="collapsible-payment-name">Card Holder Name</label>
                                <Form.Control
                                  type='text'
                                  name='card_holder_name'
                                  placeholder='Enter Card Holder Name'
                                  {...register('card_holder_name', { required: true })}
                                />
                                <ValidationError errors={errors.card_holder_name} />
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="collapsible-payment-expiry-date">Exp. Date</label>
                                <Cleave
                                  className='form-control'
                                  placeholder="MM/YY"
                                  name='expiry_date'
                                  onChange={e => {
                                    setValue("expiry_date", e.target.value)
                                  }}
                                  options={{ date: true, delimiter: '/', datePattern: ['m', 'y'] }}
                                // {...register('expiry_date', { required: true })}
                                />
                                <ValidationError errors={errors.expiry_date} />
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="collapsible-payment-cvv">CVV Code</label>
                                <div className="input-group input-group-merge">
                                  <Cleave
                                    className='form-control'
                                    placeholder="654"
                                    maxLength="3"
                                    name='cvc'
                                    onChange={e => {
                                      setValue("cvc", e.target.value)
                                    }}
                                    options={{ numeral: true, numeralPositiveOnly: true }}
                                  // {...register('cvc', { required: true })}
                                  />
                                </div>
                                <ValidationError errors={errors.cvc} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <div className="mt-3 mb-5">
                          <Button variant='primary' disabled={loading} type='submit'>
                            {loading && <Spinner />} {` `}
                            Subscribe
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