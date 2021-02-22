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
import { setCurrentTurn, setSurplusAmt, setSavingsAmt } from '../../../redux/Action'
import { useSelector, useDispatch } from 'react-redux'


function CashFlow(props) {

  const currentTurn = useSelector(state => state.dashboard.currentTurn)
  const dispatch = useDispatch()
  const [dataYear, setDataYear] = useState(currentTurn)
  // const [isPassed, setPassed] = useState(false)
  const { state } = useLocation()
  console.log('sate')
  console.log(state)
  console.log('sate data')
  console.log(state.data)
  const currentData = state.data?.filter((f) => f.year === dataYear)[0]

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
    if (!state.data) {
      switchToEntry()
    } else {
      setDataYear(state.data[0].currentTurn)
    }
  }, [state])

  useEffect(() => {
    dispatch(setSurplusAmt(currentData?.userExpenses?.savingsAvailable))
    dispatch(setSavingsAmt(currentData?.userExpenses?.totalSavings))
  }, [currentData?.userExpenses])


  // const handleNext = () => {
  //   const token = localStorage.getItem('midasToken')
  //   const auth = 'Bearer '.concat(token)
  //   console.log('token ' + token)

  //   Fetch.get(API.gamePlay.cashFlow.nextTurn, {
  //     headers: {
  //       Authorization: auth
  //     }
  //   })
  //     .then((res) => {
  //       // console.log('ok test')
  //       console.log(res)
  //       if (dataYear <= currentData.gameLength) {
  //         if (currentData.currentTurn === dataYear) {
  //           dispatch(setCurrentTurn(dataYear + 1))
  //           // switchToEntry()
  //           props.history.push(commonRoute.dashboard.mainDash)
  //           // if (isPassed) switchToEntry()
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log('not ok')
  //       console.log(err)
  //     })
  // }

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

          {/* {currentData?.currentTurn === dataYear && (
            <div className="btn-wrap" onClick={handleNext}>
              <Button className="btn nxt-btn" disabled={currentData?.gameLength === currentData?.currentTurn}>
                Next Turn
              </Button>
            </div>
          )} */}

        </div>
      </div>
    </div>
  )
}

export default CashFlow
