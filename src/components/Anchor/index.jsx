import clsx from 'clsx'
import React from 'react'
import './style.scss'

const Anchor = ({
  children,
  className,
  href,
  openNewTab,
  isMail,
  hasUnderline,
  onClick
}) => {
  const target = openNewTab ? '_blank' : undefined
  const hrefValue = isMail ? `mailto:${href}` : href
  return (
    <a
      href={hrefValue}
      className={clsx(
        'anchor-link',
        className,
        !hasUnderline && 'no-underline'
      )}
      target={target}
      onClick={onClick}
    >
      {!!children ? children : href}
    </a>
  )
}

export default Anchor
