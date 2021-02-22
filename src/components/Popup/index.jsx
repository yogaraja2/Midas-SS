import React from 'react'
import clsx from 'clsx'
import { Dialog, IconButton } from '@material-ui/core'
import { MdClose as CloseIcon } from 'react-icons/md'
import './style.scss'

function Popup({
  popupClass,
  className,
  onClose,
  title,
  children,
  open,
  withPadding,
  noClose
}) {
  return (
    <Dialog
      className={clsx('popup-dialog-container', popupClass)}
      open={open || true}
      onClose={onClose}
      PaperProps={{
        className: className
      }}
    >
      <div className={clsx('dlg-content-wrap', withPadding && 'with-padding')}>
        {!!title && (
          <div className="head-wrap">
            <h1 className="dlg-head">{title}</h1>
            {!noClose && (
              <div className="close-btn-wrap">
                <IconButton className="close-btn" onClick={onClose}>
                  <CloseIcon className="close-icon" />
                </IconButton>
              </div>
            )}
          </div>
        )}

        <div className="body-wrap">{children}</div>
      </div>
    </Dialog>
  )
}

export default Popup
