import React from 'react'
import clsx from 'clsx'
import './style.scss'
import GameCoin from '../GameCoin'

function HighlightCard({ className, label, value }) {
  return (
    <div className={clsx('highlight-card-comp', className)}>
      <div className="label">{label}</div>
      <div className="value-wrap">
        <GameCoin className="highlight-value" value={value} />
      </div>
    </div>
  )
}

export default HighlightCard
