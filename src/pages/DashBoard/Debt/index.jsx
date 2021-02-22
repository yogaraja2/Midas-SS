import React, { useState, useEffect } from 'react'
import './styles.scss'
import YearBar from '../../../components/YearBar'
import { Button, Grid } from '@material-ui/core'
import Card from '../../../components/Card'
import AmountToBorrow from './AmtToBorrow'
import LoanBalance from './LoanBalance'
import MinimumPayment from './MinimumPayment'
import AmountToRepay from './AmountToRepay'

import { API } from '../../../config/apis'
import useFetch from '../../../hooks/useFetch'
import { setDebtApiData } from '../../../redux/Action'
import { useDispatch } from 'react-redux'


function Debt() {
    const [dataYear, setDataYear] = useState(1)

    const { data } = useFetch({
        url: API.gamePlay.dept
    })

    const dispatch = useDispatch()
    dispatch(setDebtApiData(data))
    // console.log('debt data')
    // console.log(data)

    const currentData = data?.filter((f) => f.year === dataYear)[0]

    useEffect(() => {
        !!currentData?.length && setDataYear(currentData?.currentTurn)
    }, [currentData])

    const statSectionSize = {
        md: 4,
        sm: 6,
        xs: 12
    }

    const allyProps = {
        size: statSectionSize,
    }

    return (
        <div className="debt-mgt-main">
            {/* <h1>Debt Management</h1> */}
            <YearBar
                value={dataYear}
                onClick={setDataYear}
                years={currentData?.gameLength}
                clickableTill={currentData?.currentTurn}
            />

            <div className="debt-card-wrap">
                <h2 className="sec-head stats">Year {dataYear}</h2>
                <Card className="stat-card" transparent>
                    <Grid container className="stat-grid-wrap">
                        {/* <AmountToBorrow {...allyProps} /> */}
                        <LoanBalance data={currentData?.loanBalance} {...allyProps} />
                        <MinimumPayment data={currentData?.minimumPayment} {...allyProps} />
                        <AmountToRepay data={currentData?.additionalAmountToRepay} {...allyProps} />
                    </Grid>
                    {/* <Grid container className="stat-grid-wrap">
                        <AmountToRepay {...allyProps} />
                    </Grid> */}
                </Card>
            </div>
        </div>
    )
}

export default Debt
