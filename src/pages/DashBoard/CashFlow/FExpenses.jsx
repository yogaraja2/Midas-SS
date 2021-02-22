import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function FExpenses({ size, data }) {
  return (
    <Grid item {...size} className="fix-exp-sec stat-data-sec">
      <h2>Fixed Expenses</h2>
      <div className="content-wrap m-left">
        <Entry label="Mortgage" value={data?.mortgage} />
        <Entry label="Taxes" value={data?.taxes} />
        <Entry label="Utilites" value={data?.utilities} />
        <Entry label="Auto Maintenance" value={data?.autoMaintenance} />
        <Entry label="Auto Insurance" value={data?.autoInsurance} />
        <Entry label="Minimum Debt Payments" value={data?.minimumdeptRepayment} />
        <Entry label="Misc.Expenses" value={data?.miscExpenses} />
      </div>
    </Grid>
  )
}

export default FExpenses
