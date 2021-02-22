import React from 'react'
import clsx from 'clsx'
import { useStyles } from '@material-ui/pickers/views/Calendar/Day'
import { makeStyles, Tooltip } from '@material-ui/core'
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai'

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: '#353535'
  },
  tooltip: {
    backgroundColor: '#353535',
    fontSize: 14,
    fontFamily: 'inherit',
    fontWeight: 'normal',
    padding: 13
  },
  infoTipWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  infoTipIcon: {
    fontSize: (props) => (props.size ? `${props.size}em` : '1em'),
    color: (props) => props.color ?? '#5f5f5f'
  }
}))

function Infotip({
  title,
  children,
  placement,
  noArrow,
  className,
  color,
  size
}) {
  const classes = useStylesBootstrap({ color, size })

  return (
    <span className={clsx('infotip-wrap', className, classes.infoTipWrap)}>
      {children && <span className="info-component">{children}</span>}
      <Tooltip
        className={clsx('infotip')}
        title={title}
        placement={placement ?? 'top'}
        arrow={!noArrow}
        classes={classes}
      >
        <InfoIcon className={clsx('infotip-icon', classes.infoTipIcon)} />
      </Tooltip>
    </span>
  )
}

export default Infotip
