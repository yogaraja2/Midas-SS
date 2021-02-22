import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function LoanBalance({ data, size }) {
    // const { creditCard = 0, carLoan = 0, mortgage = 0, studentLoan = 0 } = data || {}
    // const total = creditCard + carLoan + mortgage + studentLoan
    return (
        <Grid item {...size} className="income-sec stat-data-sec">
            <h2>Loan Balance</h2>
            <div className="content-wrap">
                <Entry label="Credit Card" value={data?.creditLoan} />
                <Entry label="Car Loan" value={data?.carLoan} />
                <Entry label="Mortgage" value={data?.mortgageLoan} />
                <Entry label="Student Loan" value={data?.studentLoan} />
                <hr className="divider" />
                <Entry label="Total " value={data?.totalLoanBalance} />
            </div>
        </Grid>
    )
}

export default LoanBalance
