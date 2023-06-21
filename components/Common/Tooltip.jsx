import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'

const CustomTooltip = ({ children, message, position = 'top' }) => {
  const { t } = useTranslation();
  return (
    <OverlayTrigger
      placement={position}
      overlay={
        <Tooltip id={`tooltip-${position}`}>
          {t(message)}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  )
}

export default CustomTooltip