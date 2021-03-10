import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function FExpenses({ size, data }) {
  return (
    <Grid item {...size} className="fix-exp-sec stat-data-sec">
      <h2>Fixed Expenses</h2>
      <div className="content-wrap m-left">
        <Entry label="Mortgage" value={data?.mortgage} />
        <Entry label="Taxes (Income,FICA,etc..)" value={data?.taxes} />
        <Entry label="Utilites" value={data?.utilities} />
        <Entry label="Auto Maintenance (Gas,Repairs)" value={data?.autoMaintenance} />
        <Entry label="Auto Insurance" value={data?.autoInsurance} />
        <Entry label="Health Insurance Premiums" value={data?.healthInsurance} />
        <Entry label="Minimum Debt Payments (non-mortgage)" value={data?.minimumdeptRepayment} />
        <Entry label="Misc.Expenses" value={data?.miscExpenses} />
      </div>
    </Grid>
  )
}

export default FExpenses
