import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { moneyFmt } from '../../utils/commonFunctions'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  value: {
    fontSize: (props) => (props.fontSize ? `${props.fontSize}em` : '1em'),
    fontWeight: (props) => props.weight ?? 400,
    color: (props) => props.color ?? '#181c32'
  },
  icon: {
    height: (props) =>
      props.iconSize
        ? `${props.iconSize}em`
        : props.fontSize
        ? `${props.fontSize + 0.3}em`
        : '1.3em',
    marginRight: (props) => props.gap ?? 8
  }
})

function GameCoin({
  className,
  value,
  fontSize,
  iconSize,
  gap,
  weight,
  color
}) {
  const classes = useStyles({ fontSize, iconSize, gap, weight, color })

  return (
    <div className={clsx(classes.container, 'game-coin-value', className)}>
      <img
        src={require('../../assets/img/doller 2.svg').default}
        alt="Coin"
        className={clsx(classes.icon, 'cash-icon')}
      />
      <span className={clsx(classes.value, 'cash-value')}>
        {moneyFmt(value)}
      </span>
    </div>
  )
}

export default GameCoin
