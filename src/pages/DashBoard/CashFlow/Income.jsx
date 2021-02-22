import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function Income({ size, data }) {
  const { salery = 0, moneyBorrowed = 0, otherIncome = 0 } = data || {}
  const total = salery + moneyBorrowed + otherIncome

  return (
    <Grid item {...size} className="income-sec stat-data-sec">
      <h2>Income</h2>
      <div className="content-wrap">
        <Entry label="Salary" value={data?.salery} />
        <Entry label="Money borrowed" value={data?.moneyBorrowed} />
        <Entry label="Other income" value={data?.otherIncome} />
        <hr className="divider" />
        <Entry label="Total income" value={total} />
      </div>
    </Grid>
  )
}

export default Income
