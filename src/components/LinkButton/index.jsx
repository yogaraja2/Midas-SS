import React from 'react'
import './style.scss'

const LinkButton = ({ className, children, disabled, onClick, bindEvent }) => {
  const customClass = className ? ` ${className}` : ''
  const disabledClass = disabled ? ' disabled' : ''

  const handleClick = (e) => {
    !bindEvent && e.stopPropagation()
    !!onClick && !disabled && onClick()
  }

  return (
    <span
      className={'link-btn' + customClass + disabledClass}
      onClick={handleClick}
    >
      {children}
    </span>
  )
}

export default LinkButton
