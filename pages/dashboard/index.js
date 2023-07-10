import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { MdDashboard, MdDoorbell, MdEuro, MdFacebook, MdPendingActions, MdPets, MdPieChartOutline, MdRememberMe, MdTrackChanges } from 'react-icons/md'
import axiosInstance from '@/store/api/axiosInstance'
import { BiCheckCircle } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

const doctorStatItems = [
  {
    stat: 0,
    title: 'Total Campaigns',
    key: 'total_campaigns',
    link: '/dashboard/campaigns',
    icon: <MdRememberMe size={25} />,
    variant: 'primary',
  },
  {
    stat: 0,
    title: 'Total Pending Requests',
    key: 'total_pending_requests',
    link: '/dashboard/campaign-requests?status=pending',
    icon: <MdPendingActions size={25} />,
    variant: 'success',
  },
  {
    stat: 0,
    title: 'Total Approved Requests',
    key: 'total_approved_requests',
    link: '/dashboard/campaign-requests?status=approved',
    icon: <BiCheckCircle size={25} />,
    variant: 'warning',
  },
  {
    stat: 0,
    title: 'Total Collected Amount',
    key: 'total_raised_amounts',
    link: '/dashboard/subscription',
    icon: <MdTrackChanges size={25} />,
    variant: 'info',
  },
  {
    stat: 0,
    title: 'Total Subscribed Amount',
    key: 'total_subscribed_amounts',
    link: '/dashboard/subscription',
    icon: <MdEuro size={25} />,
    variant: 'info',
  },
  {
    stat: 0,
    title: 'Total Subscriptions',
    key: 'total_subscriptions',
    link: '/dashboard/subscription',
    icon: <MdDoorbell size={25} />,
    variant: 'info',
  },
]
const donorStatItems = [
  {
    stat: 0,
    title: 'Total Subscribed Amount',
    key: 'total_subscribed_amounts',
    link: '/dashboard/subscription',
    icon: <MdEuro size={25} />,
    variant: 'info',
  },
  {
    stat: 0,
    title: 'Total Subscriptions',
    key: 'total_subscriptions',
    link: '/dashboard/subscription',
    icon: <MdDoorbell size={25} />,
    variant: 'info',
  },
  {
    stat: 0,
    title: 'Total Pets',
    key: 'total_pets',
    link: '/dashboard/pets',
    icon: <MdPets size={25} />,
    variant: 'info',
  },
]

const Dashboard = () => {

  const { user } = useAuth();
  const { t } = useTranslation()
  const [stats, setStats] = useState('')
  const [statItems, setStatItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    axiosInstance.get('/dashboard').then(response => {
      setStatItems(user?.role === 'DOCTOR' ? doctorStatItems: donorStatItems);
      setStats(response?.data);
    }).catch(err => {
      if (err?.response?.status === 401) {
        window.location.replace('/auth/login')
      }
    })
  }, [])

  return (
    <>
      <ProtectedLayout title={t('Dashboard')} openGraph={{ title: t('Dashboard') }} >
        <div className='edit-profile dashboard'>
          <div className='form'>
            <Row sm={2} md={4}>
              {(user?.role === 'DOCTOR' ? doctorStatItems: donorStatItems).map((item, index) => 
                <Col className='mb-4' key={index}>
                  <Link href={item.link}>
                    <Card>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <Card.Title className=' mb-0'>
                          <h5 className="mb-0 me-2">{stats[item.key]}</h5>
                          <small><p className='mb-0'>{item.title}</p></small>
                        </Card.Title>
                        <div className="card-icon">
                          <Badge variant={item.variant} className={`rounded-pill p-2 bg-${item.variant}`}>
                            {item.icon}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default Dashboard