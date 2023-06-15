import axiosInstance from '@/store/api/axiosInstance'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

const ConfirmDelete = ({ desc, show, list, petUrl, handleClose }) => {

  const { t } = useTranslation();
  const accessToken = window.localStorage.getItem('accessToken');
  const handleDelete = () => {
    axiosInstance.delete(petUrl, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      .then(resp => {
        toast.success('Record successfully deleted');
        list();
        handleClose(false)
      }).catch(err => {

      })
  }
  return (
    <div>
      <Modal show={show} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Confirm Delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t(desc)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConfirmDelete