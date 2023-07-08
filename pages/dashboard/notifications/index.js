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
import { fetchNotifications } from '@/store/api/notification'
import moment from 'moment'
import { useAuth } from '@/hooks/useAuth'
import { BiTrash } from 'react-icons/bi'

const Notifications = () => {

  const { t } = useTranslation()
  const { user, setUser } = useAuth();
  const dispatch = useDispatch()
  const [notificationId, setNotificationId] = useState(null);
  const [show, setShow] = useState(false);

  const store = useSelector(state => state.notification);
  // console.log(store);
  function list() {

    dispatch(fetchNotifications({
      q: "",
      limit: 10,
      column: 'id',
      sort: 'desc',
    })).then(() => {
      const getUser = {
        ...user,
        notifications: 0
      }
      setUser(getUser);
    })
  }
  useEffect(() => {
    list();
  }, [dispatch])


  const handleClose = (notificationId) => {
    setNotificationId(notificationId);
    setShow(true)
  }

  return (
    <>
      <ProtectedLayout title={t('Notifications')} openGraph={{ title: t('Notifications') }}>
        <div className='inner-page'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Notifications")}</h2></Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                <Table className="table-list" hover responsive>
                  <thead>
                    <tr>
                      <th>{t("#")}</th>
                      <th>{t("Title")}</th>
                      <th>{t("Type")}</th>
                      <th>{t("Date")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      store?.data?.map(item => (
                        <Fragment key={item.id}>
                          <tr style={{ background: (item?.is_read === "0" || item?.is_read === 0) ? "#EEE" : "#FFF" }}>
                            <td>{item?.id}</td>
                            <td>{item?.description}</td>
                            <td>{item?.type}</td>
                            <td>{moment(item?.created_at).format("DD MMM, YYYY, hh:mm a")}</td>
                            <td>
                              <CustomTooltip message={'View Notification'}>
                                <Link href={notificationLine(user, item)} className='btn btn-secondary btn-sm'><MdRemoveRedEye /></Link>
                              </CustomTooltip>
                              {" "}
                              <CustomTooltip message={'Delete Notification'}>
                                <Button variant='danger' size='sm' onClick={() => handleClose(item.id)} ><BiTrash /></Button>
                              </CustomTooltip>
                            </td>
                          </tr>
                        </Fragment>
                      ))
                    }
                    {store?.data?.length == 0 ? <tr><td colSpan="7" className='text-center'>{t("No Record Found")}</td></tr> : null}
                  </tbody>
                </Table>
                <ConfirmDelete
                  desc={'Do you want to delete Notification?'}
                  show={show}
                  list={list}
                  petUrl={`/notifications/${notificationId}`}
                  handleClose={setShow}
                />
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}
const notificationLine = (user, data) => {
  let link = '';

  if (user?.role == 'DONOR') {
    if (!data?.data?.pet) {
      link = `/dashboard/pets/create?campaign_id=${data?.data?.campaign?.id}`
    } else if (data?.data?.pet) {
      link = `/dashboard/pets/campaign-documents?petId=${data?.data?.pet?.id}`
    }
  } else if (user?.role == 'DOCTOR') {
    if (data?.data?.request) {
      link = `/dashboard/campaign-requests/view/${data?.data?.request?.id}`
    }
  }
  return link
}

export default Notifications

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