import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const CustomTooltip = ({children, message, position = 'top'}) => {
  return (
    <OverlayTrigger
      placement={position}
      overlay={
        <Tooltip id={`tooltip-${position}`}>
          {message}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  )
}

export default CustomTooltip