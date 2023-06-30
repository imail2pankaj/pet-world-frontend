import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { Alert, Badge, Button, Col, Row, Spinner } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCampaignImage, getPet, uploadCampaignDocuments } from '@/store/api/pet'
import { dateFormat } from '@/core/utils/format'
import { passportAvailability, vaccination } from '@/core/utils/constants'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import nextI18nextConfig from '@/next-i18next.config'
import Dropzone from 'react-dropzone'
import { BiTrash } from 'react-icons/bi'
import { CustomTooltip } from '@/components/Common'
import { toast } from 'react-hot-toast'

const CampaignUploads = () => {

  const { t } = useTranslation()
  const router = useRouter()
  const { petId } = router?.query;
  const dispatch = useDispatch()

  const [pet, setPet] = useState("")
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [heroFiles, setHeroFiles] = useState([]);
  const [uploadedHeroFiles, setUploadedHeroFiles] = useState([]);

  const store = useSelector(state => state.pet);

  useEffect(() => {
    dispatch(getPet(petId)).then((response) => {
      setPet(response?.payload?.data)
      if (response?.payload?.data?.campaignDocuments) {
        setUploadedHeroFiles(response?.payload?.data?.campaignDocuments)
      }
    })
  }, [dispatch, petId])

  const handleDelete = (id, type) => {
    if (type === 'toUpload') {
      setHeroFiles(heroFiles.filter((file, index) => index !== id));
    }
    if (type === 'uploaded') {
      setUploadedHeroFiles(uploadedHeroFiles.filter((file) => file.id !== id));
      dispatch(deleteCampaignImage(id))
    }
  }
  useEffect(() => {
    if (store?.error && isLoading) {
      const message = store?.error?.error ? store?.error?.error : store?.error?.message;
      toast.error(message);
      setServerResponse({
        variant: "danger",
        message: message
      })
      setIsLoading(false);
    } else if (store?.petData && isLoading) {
      toast.success("Documents successfully uploaded");
      setServerResponse({
        variant: "success",
        message: "Documents successfully uploaded"
      })
      setHeroFiles([]);
      setUploadedHeroFiles([]);
      setIsLoading(false);
      router.push('/dashboard/pets')
    }
  }, [dispatch, store])

  const onSubmit = () => {
    setIsLoading(true);
    setServerResponse("");

    const formData = new FormData();

    formData.append("campaign_id", pet?.campaign?.id);
    formData.append("id", petId);
    heroFiles.map((file) => {
      formData.append("documents[]", file);
    })

    dispatch(uploadCampaignDocuments({ formData, petId, campaignId: pet?.campaign?.id }))
  }
  return (
    <ProtectedLayout title={t('Document Upload')} openGraph={{ title: t('Document Upload') }}>
      <div className='inner-page'>
        <div className='form'>
          <Row>
            <Col><h2>{t("Upload")} <b>{t("Documents")}</b></h2></Col>
            <Col className='text-end'><Link href={'/dashboard/pets'} className='btn btn-danger'>{t("List")}</Link> </Col>
          </Row>
          <div className="mb-3 mt-5 lg-3">
            <div className="mb-3">
              {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                {t(serverResponse.message)}
              </Alert>}
              <Dropzone className="mb-4" accept={{ 'image/jpeg': [], 'image/png': [] }} onDrop={(acceptedFiles) => {
                setHeroFiles(acceptedFiles.map(file => Object.assign(file, {
                  preview: URL.createObjectURL(file)
                })));
              }} name="heroImage" multiple={true}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <span style={{ fontSize: ".8rem" }}>
                      <p>{t("Drag and drop some files here, or click to select files")}</p>
                      <em>({t("Only *.jpeg and *.png images, videos will be accepted")})</em>
                    </span>
                  </div>
                )}
              </Dropzone>
              <div className='d-flex my-4'>
                {
                  uploadedHeroFiles?.map((file, index) =>
                    <div style={{ position: 'relative', height: '100px', width: '100px', marginRight: 10 }} key={index} >
                      <CustomTooltip message={"Delete Document"}><Button variant='danger' onClick={() => handleDelete(file.id, 'uploaded')} size='sm' style={{ position: "absolute", 'right': 0, borderRadius: "50%" }}><BiTrash /></Button></CustomTooltip>
                      <Image style={{ objectFit: "contain", marginRight: 10 }} src={file.name} height={100} width={100} alt="test" />
                    </div>
                  )
                }
                {
                  heroFiles?.map((file, index) =>
                    <div style={{ position: 'relative', height: '100px', width: '100px', marginRight: 10 }} key={index} >
                      <CustomTooltip message={"Delete Document"}><Button variant='danger' onClick={() => handleDelete(index, 'toUpload')} size='sm' style={{ position: "absolute", 'right': 0, borderRadius: "50%" }}><BiTrash /></Button></CustomTooltip>
                      <Image style={{ objectFit: "contain" }} key={index} src={file.preview} height={100} width={100} alt="test" />
                    </div>
                  )
                }
              </div>
              <div className='edit-profile'>
                <div className='form'>
                  <Button variant='primary' onClick={onSubmit} type='submit' disabled={heroFiles?.length == 0}>
                    {isLoading && <Spinner size='sm' className='me-2' />}
                    {t("Upload")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className='mb-4'>
                <h2>{t("Pet Details")}</h2>
                <hr />
                <Row sm={1} md={3}>
                  <p><b>{t("Pet Name")}: </b> {pet?.name}</p>
                  <p><b>{t("Pet Type")}: </b> {pet?.pet_type}</p>
                  <p><b>{t("Animal Type")}: </b> {pet?.animal_type}</p>
                  <p><b>{t("Breed")}: </b> {pet?.breed}</p>
                  <p><b>{t("Gender")}: </b> {pet?.gender}</p>
                  <p><b>{t("Age")}: </b> {pet?.age}</p>
                  <p><b>{t("Weight")}: </b> {pet?.weight}</p>
                  <p><b>{t("Location")}: </b> {pet?.location}</p>
                  <p><b>{t("Passport")}: </b> {passportAvailability[pet?.passport_available]}</p>
                  <p><b>{t("Vaccinations")}: </b> {vaccination[pet?.vaccinations]}</p>
                  <p><b>{t("Previous Diseases")}: </b> {pet?.previous_diseases}</p>
                </Row>
                <Row sm={2} md={6}>
                  {pet?.medias?.map(med => (
                    <Image className='mb-4' key={med.id} src={med.name} height={100} width={100} alt='Pet' />
                  ))}
                </Row>
              </div>
              <div>
                <h2>{t("Campaign Details")}</h2>
                <hr />
                <Row sm={1} md={3}>
                  <p><b>{t("Campaign Unique ID")}: </b> {pet?.campaign?.unique_id}</p>
                  <p><b>{t("Campaign")}: </b> {pet?.campaign?.title}</p>
                  <p><b>{t("Campaign Date")}: </b> {dateFormat(pet?.campaign?.start_date)}</p>
                  <p><b>{t("Goal Amount")}: </b> €{pet?.campaign?.goal_amount}</p>
                  <p><b>{t("Treatment")}: </b> {pet?.campaign?.treatment}</p>
                  <p><b>{t("Participation")}: </b> <Badge bg="primary">{pet?.campaign?.pet_owner_participation}%</Badge></p>
                  <p><b>{t("Campaign Created Date")}: </b> {dateFormat(pet?.campaign?.created_at)}</p>
                  <p><b>{t("Documents Uploaded")}: </b> {t(pet?.campaign?.documents?.length == 0 ? 'No' : 'Yes')}</p>
                </Row>
                <Row>
                  <p><b>Description: </b></p>
                  <p>{pet?.campaign?.description}</p>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}

export default CampaignUploads

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