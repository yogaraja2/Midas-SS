import { Button } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import './style.scss'

function ActionBtn({
  className,
  pveBtn,
  negBtn,
  onSuccess,
  onFail,
  pveText,
  negText
}) {
  
  return (
    <div className={clsx('action-btn-comp-wrap', className)}>
      <Button
        className="pve-btn btn"
        variant="outlined"
        onClick={onSuccess}
        {...pveBtn}
      >
        {pveBtn?.name ?? pveText ?? 'Yes'}
      </Button>

      <Button className="neg-btn btn" onClick={onFail} {...negBtn}>
        {negBtn?.name ?? negText ?? 'No'}
      </Button>
    </div>
  )
}

export default ActionBtn
