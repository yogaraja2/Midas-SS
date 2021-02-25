import { Grid } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import Card from '../Card'
import GameCoin from '../GameCoin'
import './style.scss'

function AssetCard({
  className,
  name,
  size,
  isBought,
  img,
  value,
  isBlack,
  color,
  transparent,
  onClick,
  onSell,
  isEnablesell
}) {
  const handleSell = (e) => {
    e.stopPropagation()
    onSell && onSell()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <Grid
      item
      {...size}
      className={clsx(
        'asset-card-wrap',
        className,
        isBought && 'is-bought',
        !isBlack && 'is-blue'
      )}
    >
      <Card
        className="asset-card"
        transparent={transparent}
        onClick={handleClick}
      >
        {isBought && isEnablesell && (
          <div className="sell-sign" onClick={handleSell}>
            Sell
          </div>
        )}

        {!!img && (
          <img
            className="asset-img"
            src={require(`../../assets/img/${img}.svg`).default}
            alt="icon"
          />
        )}

        {name === 'savingsCard' || name === 'retireCard' || name === 'buyCard' || isEnablesell ?
          (<GameCoin
            className="asset-value"
            value={value}
            fontSize={1.5}
            iconSize={2}
            weight={700}
            color={color ?? '#009FFD'}
          />) : (<span className="buy-option">Buy</span>)}

      </Card>
    </Grid>
  )
}

export default AssetCard
