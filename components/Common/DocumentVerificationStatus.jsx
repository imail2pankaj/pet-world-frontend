import React from 'react'
import { BiCheck } from 'react-icons/bi';
import { MdClose, MdPendingActions } from 'react-icons/md';
import { CustomTooltip } from '.';
import { useTranslation } from 'next-i18next';

const DocumentVerificationStatus = ({ status = 0 }) => {
  const { t } = useTranslation()
  let icon = '';
  let message = 'Documents Pending Approval';
  if (status == 0) {
    icon = <MdPendingActions fontSize={25} />
  } else if (status == 1) {
    icon = <BiCheck fontSize={25} />
    message = 'Documents Approved';
  } else if (status == 2) {
    icon = <MdClose fontSize={25} />
    message = 'Documents Rejected';
  }
  return <CustomTooltip message={t(message)}><span>{icon}</span></CustomTooltip>
}

export default DocumentVerificationStatus