import React, { useCallback, useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { InnerNavbar, PrimarySubmit, ValidationError } from '@/components/Common'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Badge, Button, Container, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { campaignStatuses, passportAvailable, petType, vaccinations } from '@/core/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedLayout from '@/components/Layout/ProtectedLayout';
import Link from 'next/link';
import { createCampaign } from '@/store/api/campaign';
import ReactDatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import axiosInstance from '@/store/api/axiosInstance';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import moment from 'moment';

const schema = yup.object().shape({
  title: yup.string().min(3).max(255).required(),
  description: yup.string().min(200).required(),
  goal_amount: yup.number().min(1, 'Goal amount should be at-least one').max(100000).required(),
  status: yup.string().required(),
  pet_owner_email: yup.string().email().required(),
  // treatment: yup.string().required(),
})

const defaultValues = {
  title: '',
  goal_amount: 0,
  start_date: '',
  description: '',
  status: 0,
  pet_owner_email: '',
  weight: 0,
  pet_owner_email: '',
  pet_owner_participation: 0,
  treatment: '',
  appointed_doctors: '',
  pet_id: '',
}

const DoctorCampaignCreate = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const [serverResponse, setServerResponse] = useState("")
  const [selectDate, setSelectDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [selectedPetOwner, setSelectedPetOwner] = useState([]);
  const [participation, setParticipation] = useState(defaultValues.pet_owner_participation)
  const [petOwners, setPetOwners] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [appointedDoctors, setAppointedDoctors] = useState([])
  const [allAppointedDoctors, setAllAppointedDoctors] = useState([]);
  const [pets, setPets] = useState([]);

  const dispatch = useDispatch();

  const fetchAppointedDoctors = async (treatment) => {
    setSelectedDoctor([])
    const data = await axiosInstance.get('/appointed-doctors?treatment=' + treatment, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    if (!data?.data?.success) {
      setAppointedDoctors(data.data);
      setAllAppointedDoctors(data.data);
    } else {
      setAppointedDoctors([]);
      setAllAppointedDoctors([]);
    }
  }

  const fetchPets = async (ownerEmail) => {
    try {
      const data = await axiosInstance.get('/owners-pets?email=' + ownerEmail);
      if (!data?.data?.success) {
        const newPets = [{id: 0, name:"No Pet"}].concat(data.data);
        setPets(newPets);
        setValue("pet_id", newPets[0]);
      } else {
        setPets([]);
        setValue("pet_id", "");
      }
    } catch (error) {
      setPets([]);
      setValue("pet_id", "");
    }
  }

  useEffect(() => {

    const fetchPetOwners = async () => {
      try {
        const data = await axiosInstance.get('/pet-owners');
        setPetOwners(data.data);
      } catch (error) {
        setPetOwners([]);
      }
    }

    const fetchSpecialities = async () => {
      try {
        const data = await axiosInstance.get('/specialities');
        setSpecialities(data.data);
      } catch (error) {
        setSpecialities([]);
      }
    }
    fetchSpecialities();
    fetchPetOwners();

  }, [])

  const store = useSelector(state => state.campaign);

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
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {

    if (store?.error && isLoading) {
      const message = store?.error?.error ? store?.error?.error : store?.error?.message;
      toast.error(message);
      setServerResponse({
        variant: "danger",
        message: message
      })
      if (store?.error?.errors) {
        Object.keys(store?.error?.errors).forEach((key) => {
          const error = store?.error?.errors;
          setError(key, {
            type: "server",
            message: error[key][0]
          });
        });
      }
      setIsLoading(false);
    } else if (store?.campaignData && isLoading) {
      reset();
      toast.success("Campaign Successfully Created");
      setServerResponse({
        variant: "success",
        message: "Campaign Successfully Created"
      })
      setIsLoading(false);
      setParticipation(0);
      router.replace('/dashboard/campaigns')
    }
  }, [dispatch, store])

  const onSubmit = data => {
    setIsLoading(true);
    setServerResponse("");
    console.log(data);
    if (!data.pet_owner_email) {
      setError('pet_owner_email', {
        type: "manual",
        message: "Pet owner email field is required"
      })
      return false
    }
    if (!data.treatment) {
      setError('treatment', {
        type: "manual",
        message: "Treatment field is required"
      })
      return false
    }
    if (!data.appointed_doctors) {
      setError('appointed_doctors', {
        type: "manual",
        message: "Appointed doctors field is required"
      })
      return false
    }

    const formData = new FormData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (key === 'appointed_doctors') {
          element.map((doctor) => {
            formData.append("appointed_doctors[]", doctor.id);
          })
        } else if (key === 'start_date') {
          formData.append(key, element ? moment(element).format("YYYY-MM-DD") : "");
        } else {
          formData.append(key, element);
        }
      }
    }

    dispatch(createCampaign(formData))
  }

  return (
    <>
      <ProtectedLayout title={t('Campaign Create')} openGraph={{ title: t('Campaign Create') }}>
        <div className='edit-profile'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Campaign")} <b>{t("Create")}</b></h2></Col>
              <Col className='text-end'><Link className='btn btn-danger' href={'/dashboard/campaigns'}>{t("List")}</Link> </Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                  {t(serverResponse.message)}
                </Alert>}
                <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Row xs={1} md={3}>
                    <Form.Group>
                      <Form.Label>{t("Campaign Title")}</Form.Label>
                      <Form.Control
                        autoFocus
                        name='title'
                        type='text'
                        label={t("Campaign Title")}
                        placeholder={t("Enter Campaign Title")}
                        isInvalid={Boolean(errors.title)}
                        {...register('title', { required: true })}
                      />
                      <ValidationError errors={errors.title} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Campaign Date')}</Form.Label>
                      <ReactDatePicker
                        name='start_date'
                        className='form-control'
                        placeholderText={t('Select Campaign Date')}
                        placeholder={t('Select Campaign Date')}
                        dateFormat="dd/MM/yyyy"
                        selected={selectDate}
                        onChange={(date) => { setValue('start_date', date); setSelectDate(date) }}
                      />
                      <ValidationError errors={errors.start_date} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Goal Amount")}</Form.Label>
                      <Form.Control
                        name='goal_amount'
                        type='number'
                        label={t('Goal Amount')}
                        placeholder={t("Enter Goal Amount")}
                        isInvalid={Boolean(errors.goal_amount)}
                        {...register('goal_amount', { required: true })}
                      />
                      <ValidationError errors={errors.goal_amount} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={1} className='mb-4'>
                    <Form.Group md={6}>
                      <Form.Label>{t("Description")}</Form.Label>
                      <Form.Control
                        name='description'
                        type='text'
                        multiple
                        as="textarea"
                        style={{ height: 220 }}
                        label={t('Description')}
                        placeholder={t("Enter Description")}
                        isInvalid={Boolean(errors.description)}
                        {...register('description')}
                      />
                      <ValidationError errors={errors.description} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={3}>
                    {/* <Form.Group>
                      <Form.Label>{t("Pet Owner Email")}</Form.Label>
                      <Form.Control
                        name='pet_owner_email'
                        type='email'
                        label={t('Pet Owner Email')}
                        placeholder={t("Enter Pet Owner Email")}
                        isInvalid={Boolean(errors.pet_owner_email)}
                        {...register('pet_owner_email', { required: true })}
                      />
                      <ValidationError errors={errors.pet_owner_email} />
                    </Form.Group> */}
                    <Form.Group>
                      <Form.Label>{t("Pet Owner Email")}</Form.Label>
                      <Typeahead
                        name='pet_owner_email'
                        id='pet_owner_email'
                        onChange={(selections) => {
                          if (selections) {
                            setSelectedPetOwner(selections)
                            if (selections[0]?.customOption) {
                              setValue('pet_owner_email', selections[0].label);
                              fetchPets(selections[0].label);
                            } else {
                              setValue('pet_owner_email', selections[0]);
                              fetchPets(selections[0]);
                            }
                          }
                        }}
                        options={petOwners}
                        placeholder="Select Pet Owner Email..."
                        selected={selectedPetOwner}
                        allowNew
                        newSelectionPrefix="Add New: "
                      />
                      <ValidationError errors={errors.pet_owner_email} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Pet')}</Form.Label>
                      <Form.Select
                        defaultValue={0}
                        className='form-control'
                        name='pet_id'
                        {...register("pet_id", { required: true })}>
                        {pets.map(pet => <option value={pet.id} key={pet.id}>{t(pet.name)}</option>)}
                      </Form.Select>
                      <ValidationError errors={errors.pet_id} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t("Pet Owner Participation")} <Badge bg="secondary">{`${participation}%`}</Badge></Form.Label>
                      <Form.Range
                        name='pet_owner_participation'
                        min="0" max="50"
                        defaultValue={participation}
                        onInput={(e) => setParticipation(e.target.value)}
                        label={t('pet_owner_participation')}
                        placeholder={t("Select Pet Owner Participation")}
                        {...register('pet_owner_participation', { required: true })}
                      />
                      <ValidationError errors={errors.pet_owner_participation} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Treatments</Form.Label>
                      <Typeahead
                        name='treatment'
                        id='treatment'
                        onChange={(selections) => {
                          setSelected(selections)
                          setValue('treatment', selections[0]);
                          fetchAppointedDoctors(selections);
                        }}
                        options={specialities}
                        placeholder="Select Treatments..."
                        selected={selected}
                      />
                      <ValidationError errors={errors.treatment} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Appointed Doctors
                      </Form.Label>
                      <Typeahead
                        name='appointed_doctors'
                        id='appointed_doctors'
                        labelKey="first_name"
                        multiple
                        onChange={(selections) => {
                          console.log(selections);
                          setSelectedDoctor(selections)
                          setValue('appointed_doctors', selections);
                          if (selections.length >= 3) {
                            setAppointedDoctors(selectedDoctor);
                          } else {
                            setAppointedDoctors(allAppointedDoctors);
                          }
                        }}
                        options={appointedDoctors}
                        placeholder="Select Appointed Doctors..."
                        selected={selectedDoctor}
                        renderMenuItemChildren={(option) => (
                          <>
                            <b className='d-block'>{option.email} </b>
                            <span>{option.first_name} {option.surname} </span>
                          </>
                        )}
                      />
                      <ValidationError errors={errors.appointed_doctors} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('Status')}</Form.Label>
                      <Form.Select
                        defaultValue={0}
                        className='form-control'
                        name='status'
                        {...register("status", { required: true })}>
                        {campaignStatuses.map(status => <option value={status.value} key={status.value}>{t(status.name)}</option>)}
                      </Form.Select>
                      <ValidationError errors={errors.status} />
                    </Form.Group>
                  </Row>

                  <Row xs={1} md={3}>
                    <div className="mb-5">
                      <Button variant='primary' type='submit'>
                        {isLoading && <Spinner size='sm' className='me-2' />}
                        {t("Save")}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </>
  )
}

export default DoctorCampaignCreate

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