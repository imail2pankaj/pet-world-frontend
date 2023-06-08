import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { PrimarySubmit, ValidationError } from '@/components/Common'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import axiosInstance from '@/store/api/axiosInstance';


const schema = yup.object().shape({
  bio: yup.string().max(255).required(),
  qualifications: yup.string().required()
})

const defaultValues = {
  bio: '',
  qualifications: '',
  specialities: [],
  facebook: '',
  instagram: '',
  twitter: '',
  linkedin: ''
}

const AboutProfile = () => {
  const router = useRouter();
  const [serverResponse, setServerResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [allSpecialities, setAllSpecialities] = useState([]);
  const { getAboutProfileData, aboutProfileUpdate } = useAuth();

  useEffect(() => {

    const fetchAboutProfile = async () => {
      try {

        const data = await getAboutProfileData();
        const user = data.data;

        for (const key in defaultValues) {
          if (key === 'specialities') {
            setValue(key, user[key]);
            setSelected(user[key]);
          } else {
            setValue(key, user[key] ? user[key] : "");
          }
        }
      } catch (err) {

      }
    }
    const fetchSpecialities = async () => {
      const data = await axiosInstance.get('/specialities');
      setSpecialities(data.data);
      setAllSpecialities(data.data);
      fetchAboutProfile()
    }
    fetchSpecialities();

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

  const onSubmit = data => {
    if (selected && selected.length == 0) {
      setError('specialities', {
        type: "manual",
        message: "Specialities field is required"
      });
      return false;
    }
    setIsLoading(true);
    setServerResponse("");
    const formData = {
      ...data,
      specialities: selected,
    }

    aboutProfileUpdate(formData, (err) => {
      if (err?.response?.data?.errors) {
        toast.error(err?.response?.data?.message ? err?.response?.data?.message : 'Something went wrong, please try again');
        Object.keys(err?.response?.data.errors).forEach((key) => {
          const error = err?.response?.data.errors;
          setServerResponse({
            variant: "danger",
            message: err?.response?.data?.message
          })
          setError(key, {
            type: "server",
            message: error[key][0]
          });
        });
      } else {
        toast.success(err?.data?.message);
        setServerResponse({
          variant: "success",
          message: err?.data?.message
        })
      }
      setIsLoading(false);
    })
  }

  return (
    <>
      <NextSeo title='About Profile Update' openGraph={{ title: "About Profile Update" }} />
      <Container fluid="xxl">
        <div className='edit-profile'>
          <div className='form'>
            <h2>About Profile <b>Update</b></h2>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                {serverResponse && <Alert key={serverResponse.variant} variant={serverResponse.variant}>
                  {serverResponse.message}
                </Alert>}
                <Form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Row xs={1} md={1}>
                    <Form.Group>
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        className='mb-4'
                        rows={2}
                        name='bio'
                        label='Bio'
                        placeholder="Enter Bio"
                        isInvalid={Boolean(errors.bio)}
                        {...register('bio', { required: true, minLength: { value: 3 } })}
                      />
                      <ValidationError errors={errors.bio} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={2}>
                    <Form.Group>
                      <Form.Label>Qualifications</Form.Label>
                      <Form.Control
                        name='qualifications'
                        type='text'
                        label='Qualifications'
                        placeholder="Enter Qualifications"
                        isInvalid={Boolean(errors.qualifications)}
                        {...register('qualifications', { required: true })}
                      />
                      <ValidationError errors={errors.qualifications} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Specialities
                        <Form.Text className="text-muted">
                          {` `}(Min 1 and Max 5)
                        </Form.Text>
                      </Form.Label>
                      <Typeahead
                        name='specialities'
                        id='specialities'
                        // labelKey="label"
                        multiple
                        onChange={(selections) => {
                          setSelected(selections)
                          if (selections.length >= 5) {
                            setSpecialities(selected);
                          } else {
                            setSpecialities(allSpecialities);
                          }
                        }}
                        options={specialities}
                        // options={options}
                        placeholder="Select Specialities..."
                        selected={selected}
                      />
                      <ValidationError errors={errors.specialities} />
                    </Form.Group>
                  </Row>
                  <Row xs={1} md={4}>
                    <Form.Group>
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        className='form-control'
                        type="url"
                        label='Facebook'
                        name="facebook"
                        placeholder='Enter Facebook url'
                        {...register("facebook", { required: true, })}
                      />
                      <ValidationError errors={errors.facebook} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control
                        type="url"
                        label='instagram'
                        name="instagram"
                        placeholder="Enter instagram url"
                        {...register("instagram", { required: true })}
                      />
                      <ValidationError errors={errors.instagram} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control
                        type="url"
                        label='Twitter'
                        name="twitter"
                        placeholder="Enter twitter url"
                        {...register("twitter", { required: true })}
                      />
                      <ValidationError errors={errors.twitter} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Linkedin</Form.Label>
                      <Form.Control
                        type="url"
                        label='Linkedin'
                        name="linkedin"
                        placeholder="Enter linkedin url"
                        {...register("linkedin", { required: true })}
                      />
                      <ValidationError errors={errors.linkedin} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <div className="mb-5">
                      <Button variant='primary' type='submit'>
                        {isLoading && <Spinner size='sm' className='me-2' />}
                        Save
                      </Button>
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container >
    </>
  )
}

export default AboutProfile