import Link from 'next/link'
import React, { Fragment, lazy, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { Badge, Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MdRemoveRedEye } from "react-icons/md";
import { ConfirmDelete, CustomTooltip, DocumentVerificationStatus } from '@/components/Common'
import { fetchSubscriptions } from '@/store/api/subscription'
import moment from 'moment'
import { useAuth } from '@/hooks/useAuth'
import { BiTrash } from 'react-icons/bi'

const Subscriptions = () => {

  const { t } = useTranslation()
  const { user, setUser } = useAuth();
  const dispatch = useDispatch()

  const store = useSelector(state => state.subscription);
  console.log(store);
  function list() {

    dispatch(fetchSubscriptions({
      q: "",
      limit: 10,
      column: 'id',
      sort: 'desc',
    })).then(() => {

    })
  }
  useEffect(() => {
    list();
  }, [dispatch])

  return (
    <>
      <ProtectedLayout title={t('Subscriptions')} openGraph={{ title: t('Subscriptions') }}>
        <div className='inner-page'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Subscriptions")}</h2></Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                <Table className="table-list" hover responsive>
                  <thead>
                    <tr>
                      <th>{t("#")}</th>
                      <th>{t("Campaign")}</th>
                      <th>{t("Campaign By")}</th>
                      <th>{t("Campaign For")}</th>
                      <th>{t("Pet")}</th>
                      <th>{t("Amount")}</th>
                      <th>{t("Subscribe Date")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      store?.data?.map(item => (
                        <Fragment key={item.id}>
                          <tr>
                            <td>{item?.id}</td>
                            <td><Link href={`/campaigns/${item?.campaign?.slug}`}>{item?.campaign?.title}</Link><br />Treatment: {item?.campaign?.treatment}</td>
                            <td>
                              <Link href={`/doctors/${item?.campaign?.doctor?.username}`}>{item?.campaign?.doctor?.first_name} {item?.campaign?.doctor?.surname}</Link>
                              <br />{item?.campaign?.doctor?.email}
                            </td>
                            <td>{item?.campaign?.owner?.first_name} {item?.campaign?.owner?.surname}<br />{item?.campaign?.owner?.email}</td>
                            <td>
                              {item?.campaign?.pet?.name}<br/>
                              {item?.campaign?.pet?.pet_type} ({item?.campaign?.pet?.animal_type})
                            </td>
                            <td>€{parseFloat(item?.amount) + parseFloat(item?.commission_amount)}</td>
                            <td>{moment(item?.created_at).format("DD MMM, YYYY, hh:mm a")}</td>
                            <td><Button variant='danger'>Cancel</Button></td>
                          </tr>
                        </Fragment>
                      ))
                    }
                    {store?.data?.length == 0 ? <tr><td colSpan="7" className='text-center'>{t("No Record Found")}</td></tr> : null}
                  </tbody>
                </Table>

              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default Subscriptions

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
    revalidate: 100,
  }
}