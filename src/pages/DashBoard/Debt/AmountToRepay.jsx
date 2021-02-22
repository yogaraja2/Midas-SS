import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function AmountToRepay({ data, size }) {
    // const { creditCard = 0, carLoan = 0, mortgage = 0, studentLoan = 0 } = data || {}
    // const surplus = 10000; const cash = 20000;
    // const total = creditCard + carLoan + mortgage + studentLoan
    return (
        <Grid item {...size} className="income-sec stat-data-sec">
            <h2>Amount To Repay</h2>
            <div className="content-wrap">
                <Entry label="Surplus Available" value={data?.surplusAvailable} />
                <Entry label="Cash Available" value={data?.cashAvailable} />
                {/* <Entry label="Credit Card" value={data?.creditCard} />
                <Entry label="Car Loan" value={data?.carLoan} />
                <Entry label="Mortgage" value={data?.mortgage} />
                <Entry label="Student Loan" value={data?.studentLoan} />
                <hr className="divider" />
                <Entry label="Total " value={total} /> */}
            </div>
        </Grid>
    )
}

export default AmountToRepay
