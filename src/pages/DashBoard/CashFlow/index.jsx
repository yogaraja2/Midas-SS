import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import Card from '../../../components/Card'
import YearBar from '../../../components/YearBar'
import './styles.scss'
import Income from './Income'
import StatTotal from './StatTotal'
import FExpenses from './FExpenses'
import VExpenses from './VExpenses'
import SatisfactionCard from './SatisfactionCard'
import { useLocation } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import { API } from '../../../config/apis'
import Fetch from '../../../Api'
import { setCurrentTurn, setSurplusAmt, setSavingsAmt, setCashFlowApiData } from '../../../redux/Action'
import { useSelector, useDispatch } from 'react-redux'


function CashFlow(props) {

  const currentTurn = useSelector(state => state.dashboard.currentTurn)
  const dispatch = useDispatch()
  const [dataYear, setDataYear] = useState(currentTurn)

  const state = useSelector(state => state.cashFlowData)
  const currentData = state[0]
  // console.log('state')
  // console.log(currentData)

  const statSectionSize = {
    md: 4,
    sm: 6,
    xs: 12
  }
  const allyProps = {
    size: statSectionSize,
    data: currentData?.userExpenses
  }

  const switchToEntry = () => {
    props.history.push(commonRoute.dashboard.cashFlow)
  }

  useEffect(() => {
    if (!state) {
      switchToEntry()
    } else {
      setDataYear(state[0].year)
    }
  }, [state])

  useEffect(() => {
    dispatch(setSurplusAmt(currentData?.userExpenses?.savingsAvailable))
    dispatch(setSavingsAmt(currentData?.userExpenses?.totalSavings))
  }, [currentData?.userExpenses])


  useEffect(() => {

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('midasToken')}`
    }
    const param = { turn: dataYear };

    Fetch.post(API.gamePlay.cashFlow.history, param, { headers })
      .then(res => {
        // console.log(res.data)
        dispatch(setCashFlowApiData(res.data))
      })
      .catch(err => {
        // console.log(err.message)
      })
  }, [dataYear])


  const goToBalance = () => {
    props.history.push(commonRoute.dashboard.balance)
  }

  return (
    <div className="dash-cash-flow-page">
      <YearBar
        value={dataYear}
        onClick={setDataYear}
        years={currentData?.gameLength}
        // years={40}
        clickableTill={currentData?.currentTurn}
      />

      <div className="stat-card-wrap">
        <h2 className="sec-head stats">Year {dataYear}</h2>
        <Card className="stat-card" transparent>
          <Grid container className="stat-grid-wrap">
            <Income {...allyProps} />
            <FExpenses {...allyProps} />
            <VExpenses {...allyProps} />
            <StatTotal {...allyProps} />
          </Grid>
        </Card>


        <h3 className="sec-head sat">Satisfaction Score</h3>
        <SatisfactionCard data={currentData?.satisfactionPoints} />

        <div className="action-btn-wrap">
          <div className="btn-wrap">
            <Button className="btn" onClick={switchToEntry}>
              Back
            </Button>
          </div>
          <div className="btn-wrap" onClick={goToBalance}>
            <Button className="btn">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashFlow
