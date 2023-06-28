import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap';
import LoginPopup from './LoginPopup';
import { ValidationError } from '.';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { reportDoctor } from '@/store/api/private-common-api';
import { toast } from 'react-hot-toast';

const ReportDoctorModal = (props) => {

  const { t } = useTranslation()
  const auth = useAuth();
  const dispatch = useDispatch()

  const [reason, setReason] = useState("");
  const [modalShow, setModalShow] = useState(!auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitReport = () => {
    if (!reason) {
      setError("Reason is required to report the doctor")
      return false;
    }
    setError("")
    setLoading(true)
    dispatch(reportDoctor({ doctor_id: props?.doctor?.id, reason })).then(() => {
      setLoading(false)
      toast.success('Doctor successfully reported');
      const reports = auth?.user?.reports;
      reports.push(props?.doctor?.id)
      auth.setUserData({
        ...auth.user,
        reports:reports
      })
      props.onHide()
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Modal {...props} dialogClassName="event-popup" aria-labelledby="contained-modal-title-vcenter" centered>
        {(!auth.isAuthenticated && modalShow) && <LoginPopup show={modalShow} hideLogin={setModalShow} onHide={() => setModalShow(false)} />}
        {(!modalShow) && <>
          <Form>
            <Modal.Body>
              <Button onClick={props.onHide}><img src={`/close.png`} alt={""} /></Button>
              <h4>Report Doctor - {props?.doctor?.first_name} {props?.doctor?.surname}</h4>
              <hr />
              <Row xs={1} md={1} className='mb-4'>
                <Form.Group md={6}>
                  <Form.Label>{t("Reason to report")}</Form.Label>
                  <Form.Control
                    onChange={(e) => setReason(e.target.value)}
                    name='description'
                    type='text'
                    multiple
                    as="textarea"
                    style={{ height: 220 }}
                    label={t('Reason to report')}
                    placeholder={t("Enter Reason to report")}
                  // {...register('description')}
                  />
                  <ValidationError errors={error} />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button className='button-1' type='button' onClick={() => submitReport()} disabled={loading}>{loading ? "Submitting" : "Submit"}</button>
              <button className='button-1' type='button' onClick={props.onHide} role='button'>Cancel</button>
            </Modal.Footer>
          </Form>
        </>}
      </Modal>

    </>
  )
}

export default ReportDoctorModal