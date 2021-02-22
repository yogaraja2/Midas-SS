import React from 'react'
import clsx from 'clsx'
import { moneyFmt } from '../../../utils/commonFunctions'

const Entry = ({ label, value, className, endEven }) => (
  <div
    className={clsx('stat-entry', className, endEven ? 'j-end' : 'j-lrpart')}
  >
    <div className="label">{label}</div>
    <div className="value">
      <img
        src={require('../../../assets/img/doller 2.svg').default}
        alt="coin"
        className="coin-icon-min"
      />
      <span className="amount">{moneyFmt(value)}</span>
    </div>
  </div>
)

export default Entry
