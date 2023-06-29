import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { MdDashboard, MdFacebook, MdPieChartOutline, MdRememberMe, MdTrackChanges } from 'react-icons/md'

const stats = [
  {
    stat: 80,
    title:'Total Campaigns',
    link: '/dashboard/campaigns',
    icon: <MdRememberMe size={25} />,
    variant: 'primary'
  },
  {
    stat: 90,
    title:'Total Pending Requests',
    link: '/dashboard/campaign-requests?status=pending',
    icon: <MdFacebook size={25} />,
    variant: 'success'
  },
  {
    stat: 100,
    title:'Total Approved Requests',
    link: '/dashboard/campaign-requests?status=approved',
    icon: <MdTrackChanges size={25} />,
    variant: 'warning'
  },
  {
    stat: 1000,
    title:'Total Collected Amount',
    link: '/dashboard/subscription',
    icon: <MdTrackChanges size={25} />,
    variant: 'info'
  },
]
const Dashboard = () => {
  const { t } = useTranslation()
  return (
    <>
      <ProtectedLayout title={t('Dashboard')} openGraph={{ title: t('Dashboard') }} >
        <div className='edit-profile dashboard'>
          <div className='form'>
            <Row sm={2} md={4}>
              {stats.map((item, index) =>
                <Col key={index}>
                  <Link href={item.link}>
                    <Card>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <Card.Title className=' mb-0'>
                          <h5 className="mb-0 me-2">{item.stat}</h5>
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