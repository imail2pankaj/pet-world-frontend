import Link from 'next/link'
import React, { lazy, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPets } from '@/store/api/pet'
import { useEffect } from 'react'
import { passportAvailability, vaccination } from '@/core/utils/constants'
import { BiEdit, BiTrash } from "react-icons/bi";
import { ConfirmDelete } from '@/components/Common'

const Pets = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [petId, setPetId] = useState(null);

  const store = useSelector(state => state.pet);

  const petList = () => {
    dispatch(fetchPets({
      q: "",
      limit: 10,
      column: 'id',
      sort: 'desc',
    }))
  }
  useEffect(() => {
    petList();
  }, [dispatch])

  const handleClose = (petId) => {
    setPetId(petId);
    setShow(true)
  }

  return (
    <>
      <ProtectedLayout title={t('Pets')} openGraph={{ title: t('Pets') }}>
        <div className='edit-profile'>
          <div className='form'>
            <Row>
              <Col><h2>{t("Pets")}</h2></Col>
              <Col className='text-end'><Link href={'/dashboard/pets/create'}>{t("Create")}</Link> </Col>
            </Row>
            <div className="mb-3 mt-5 lg-3">
              <div className="mb-3">
                <Table className="table-list" hover responsive>
                  <thead>
                    <tr>
                      <th>{t("Name")}</th>
                      <th>{t("Pet")}</th>
                      <th>{t("Age")} / {t("Weight")}</th>
                      <th>{t("Breed")}</th>
                      <th>{t("Location")}</th>
                      <th>{t("Passport")}</th>
                      <th>{t("Vaccinations")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      store?.data?.map(pet => (
                        <tr key={pet.id}>
                          <td>{pet.name}</td>
                          <td>{pet.pet_type} ({pet.animal_type})</td>
                          <td>{pet.age} / {pet.weight}</td>
                          <td>{pet.breed}</td>
                          <td>{pet.location}</td>
                          <td>{t(passportAvailability[pet.passport_available])}</td>
                          <td>{t(vaccination[pet.vaccinations])}</td>
                          <td>
                            <Link href={`/dashboard/pets/edit/${pet.id}`} ><BiEdit /></Link> {` `}
                            <Button onClick={() => handleClose(pet.id)} ><BiTrash /></Button>
                          </td>
                        </tr>
                      ))
                    }
                    {store?.data?.length == 0 ? <tr><td colspan="8" className='text-center'>{t("No Record Found")}</td></tr> : null}
                  </tbody>
                </Table>
                <ConfirmDelete
                  desc={'Do you want to delete Pet?'}
                  show={show}
                  list={petList}
                  petUrl={`/pets/${petId}`}
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

export default Pets

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