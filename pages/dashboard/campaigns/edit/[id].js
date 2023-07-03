import React, { createRef, useCallback, useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationError } from '@/components/Common'
import { useForm } from 'react-hook-form'
import { Alert, Badge, Button, Container, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { campaignStatuses } from '@/core/utils/constants';
import { createPet, getCampaign, updateCampaign } from '@/store/api/campaign';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedLayout from '@/components/Layout/ProtectedLayout';
import Link from 'next/link';
import nextI18nextConfig from '@/next-i18next.config';
import axiosInstance from '@/store/api/axiosInstance';
import ReactDatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import moment from 'moment';
import { noPets } from '@/core/utils/functions';

const schema = yup.object().shape({
  title: yup.string().min(3).max(255).required(),
  description: yup.string().min(20).required(),
  goal_amount: yup.number().min(1, 'Goal amount should be at-least one').max(100000).required(),
  status: yup.string().required(),
  pet_owner_email: yup.string().email().required(),
})

const defaultValues = {
  title: '',
  goal_amount: 0,
  start_date: '',
  description: '',
  status: 0,
  pet_owner_email: '',
  pet_owner_participation: 0,
  treatment: '',
  appointed_doctors: '',
  old_appointed_doctors: '',
  pet_id: 0,
}

const PetCreate = () => {

  const { t } = useTranslation();
  const router = useRouter();
  const { query: { id } } = router;
  const [serverResponse, setServerResponse] = useState("")
  const [selectDate, setSelectDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [oldSelectedDoctor, setOldSelectedDoctor] = useState([]);
  const [participation, setParticipation] = useState(defaultValues.pet_owner_participation)
  const [selectedPetOwner, setSelectedPetOwner] = useState([]);
  const [petOwners, setPetOwners] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [appointedDoctors, setAppointedDoctors] = useState([])
  const [allAppointedDoctors, setAllAppointedDoctors] = useState([]);
  const [pets, setPets] = useState(noPets());
  const refAppointedDoctors = createRef("")

  const dispatch = useDispatch();

  const store = useSelector(state => state.campaign);

  const fetchAppointedDoctors = async (treatment) => {
    setSelectedDoctor([])
    const data = await axiosInstance.get('/appointed-doctors?treatment=' + treatment);
    if (!data?.data?.success) {
      setAppointedDoctors(data.data);
      setAllAppointedDoctors(data.data);
    } else {
      setAppointedDoctors([]);
      setAllAppointedDoctors([]);
    }
  }

  const fetchPets = async (ownerEmail, edit = "") => {
    try {
      const data = await axiosInstance.get('/owners-pets?email=' + ownerEmail);
      if (!data?.data?.success) {
        setPets(noPets(data.data));
        if (!edit) {
          setValue("pet_id", newPets[0].id);
        }
      } else {
        setPets(noPets());
        if (!edit) {
          setValue("pet_id", 0);
        }
      }
    } catch (error) {
      setPets(noPets());
      setValue("pet_id", 0);
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

  useEffect(() => {
    dispatch(getCampaign(id)).then((response) => {
      const data = response?.payload?.data;
      for (const key in defaultValues) {
        if (key === 'pet_owner_participation') {
          setParticipation(data[key]);
          setValue(key, data[key] ? data[key].toString() : "");
        } else if (key === 'pet_owner_email') {
          fetchPets(data[key], 'edit').then(() => {
            const petOwner = [{
              label: data[key],
              id: 0
            }]
            setSelectedPetOwner(petOwner);
            setValue(key, data[key] ? data[key].toString() : "");
            setValue("pet_id", data['pet_id']);
          })
        } else if (key === 'pet_id') {
          setValue("pet_id", data[key].toString());
        } else if (key === 'start_date' && data[key]) {
          setValue(key, data[key]);
          setSelectDate(new Date(data[key]));
        } else if (key === 'treatment') {
          fetchAppointedDoctors(data[key]).then(() => {
            setSelected([data[key]])
            setValue('treatment', data[key]);
            if (data?.approval) {
              const editSelected = [];
              data?.approval?.map(req => {
                editSelected.push({
                  id: req.doctor.id,
                  email: req.doctor.email,
                  first_name: req.doctor.first_name,
                  surname: req.doctor.surname,
                })
              })
              setSelectedDoctor(editSelected)
              setOldSelectedDoctor(editSelected)
              setValue("appointed_doctors", editSelected);
              setValue("old_appointed_doctors", editSelected);
            }
          })
        } else {
          setValue(key, data[key] ? data[key].toString() : "");
        }
      }
    })
  }, [dispatch, id])

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
      toast.success(t("Campaign Successfully Updated"));
      setServerResponse({
        variant: "success",
        message: "Campaign Successfully Updated"
      })
      setIsLoading(false);
      router.replace("/dashboard/campaigns");
    }
  }, [dispatch, store])

  const onSubmit = data => {
    setIsLoading(true);
    setServerResponse("");
    // console.log(data);
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
    // if (!data.appointed_doctors) {
    //   setError('appointed_doctors', {
    //     type: "manual",
    //     message: "Appointed doctors field is required"
    //   })
    //   return false
    // }

    const formData = new FormData();
    for (const key in data) {
      // if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (key === 'appointed_doctors') {
        if (data.appointed_doctors) {
          element.map((doctor) => {
            formData.append("appointed_doctors[]", doctor.id);
          })
        } else {
          formData.append("appointed_doctors", "");
        }
      } else if (key === 'old_appointed_doctors') {
        if (data.old_appointed_doctors) {
          element.map((doctor) => {
            formData.append("old_appointed_doctors[]", doctor.id);
          })
        } else {
          formData.append("old_appointed_doctors", "");
        }
      } else if (key === 'start_date') {
        formData.append(key, element ? moment(element).format("YYYY-MM-DD") : "");
      } else {
        formData.append(key, element);
      }
      // }
    }

    dispatch(updateCampaign({ formData, id }))
  }

  const handleSelectRandomly = async () => {
    const array = selectedDoctor;

    if (selectedDoctor.length <= 3) {
      setSelectedDoctor(prev => [...[], ...[]]);

      for (const doctor of appointedDoctors) {
        const findDoc = selectedDoctor.find(doc => doctor.id == doc.id);
        if (!findDoc && selectedDoctor.length < 3) {
          if (selectedDoctor.length < 3) {
            array.push(doctor);
          } else {
            return false;
          }
        }
      };
      setSelectedDoctor((selectedDoctor) => [...[], ...array]);
      setValue('appointed_doctors', array);

      refAppointedDoctors.current.focus();
      refAppointedDoctors.current.blur();
    }
  }
  return (
    <>
      <ProtectedLayout title={t('Campaign Edit')} openGraph={{ title: t('Campaign Edit') }}>
        <div className='edit-profile'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Campaign")} <b>{t("Edit")}</b></h2></Col>
              <Col className='text-end'><Link href={'/dashboard/campaigns'} className='btn btn-danger'>{t("List")}</Link> </Col>
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
                      <Form.Label className='d-block'>
                        Appointed Doctors
                        {selected && selectedDoctor.length < 3 ? <Button variant='link' onClick={handleSelectRandomly} className='p-0 float-end'>Select Randomly</Button> : null}
                      </Form.Label>
                      <Typeahead
                        ref={refAppointedDoctors}
                        name='appointed_doctors'
                        id='appointed_doctors'
                        labelKey="first_name"
                        multiple
                        onFocus={() => {
                          if (selectedDoctor.length >= 3) {
                            setAppointedDoctors(selectedDoctor);
                          } else {
                            setAppointedDoctors(allAppointedDoctors);
                          }
                        }}
                        onChange={(selections) => {
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

export default PetCreate

export async function getServerSideProps({ locale, query }) {
  const { id } = query;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'], nextI18nextConfig))
    },
  }
}