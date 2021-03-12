import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function VExpenses({ size, data }) {
  return (
    <Grid item {...size} className="var-exp-sec stat-data-sec">
      <h2>Variable Expenses</h2>
      <div className="content-wrap m-left">
        <Entry label="Living Expenses" value={data?.livingExpenses} />
        <Entry label="Entertainment" value={data?.entertainment} />
        <Entry label="Retirement Savings" value={data?.retirementSavings} />
        <Entry label="Events Expenses" value={data?.randomEvents} />
        <Entry label="Dream Cost" value={data?.dreamCost} />
        <Entry label="Debt Repayment " value={data?.deptRepayment} />
        <Entry label="Extra CreditLoan Payment " value={data?.extraCreditLoanPayment} />
        <Entry label="Extra MortgageLoan Payment " value={data?.extraMortgageLoanPayment} />
        <Entry label="Extra StudentLoan Payment " value={data?.extraStudentLoanPayment} />
        <Entry label="Extra VehicleLoan Payment " value={data?.extraVehicleLoanPayment} />
      </div>
    </Grid>
  )
}

export default VExpenses
