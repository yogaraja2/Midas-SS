import React, { useEffect, useState } from 'react'
import Assets from './Assets'
import Liabilities from './Liabilities'
import { Button, Grid } from '@material-ui/core'
import './styles.scss'
import YearBar from '../../../components/YearBar'
import useFetch from '../../../hooks/useFetch'
import { API } from '../../../config/apis'
import HighlightCard from '../../../components/HighlightCard'
import { setNetworth, setBalanceApiData, setCurrentTurn } from '../../../redux/Action'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'


function Balance() {

  const currentTurn = useSelector(state => state.dashboard.currentTurn)
  const gameLength = useSelector(state => state.selectAvatar.gameLength)
  const dispatch = useDispatch()
  const [dataYear, setDataYear] = useState(currentTurn)
  const { data } = useFetch({
    url: API.gamePlay.balance
  })
  console.log(data)

  dispatch(setBalanceApiData(data))
  const currentData = data?.filter((f) => f.year === dataYear)[0]

  useEffect(() => {
    dispatch(setNetworth(currentData?.netWorth))
    !!currentData?.length && setDataYear(currentData?.currentTurn)
  }, [currentData])

  useEffect(() => {
    setCurrentTurn(dataYear)
  }, [dataYear])

  const history = useHistory()

  const goToStats = () => {
    history.push(commonRoute.dashboard.stats)
  }

  return (
    <div className="dashboard-balance-page">
      {/* <YearBar
        value={dataYear}
        onClick={setDataYear}
        years={currentData?.gameLength}
        clickableTill={currentData?.currentTurn}
      /> */}
      <div className="turn-wrap">
        {currentTurn > 1 && <img src={require('../../../assets/img/ArrLeft.svg').default} alt="left arrow" onClick={() => setDataYear(currentTurn - 1)} />}
        <h2 className="current-turn">Year {dataYear}</h2>
        {currentTurn !== 1 && currentTurn < gameLength && <img src={require('../../../assets/img/ArrRight.svg').default} alt="right arrow" onClick={() => setDataYear(currentTurn + 1)} />}
      </div>
      <div className="asset-bal-det">
        <h2 className="sec-head">Assets</h2>
        <Assets data={currentData?.assets} lbty={currentData?.liabilities} isEnablesell={(dataYear === currentData?.currentTurn) ? true : false} />
        <HighlightCard
          className="asset-tot"
          label="Total Assets"
          value={currentData?.assets?.totalAssets}
        />
      </div>

      <div className="liblty-bal-det">
        <Liabilities data={currentData?.liabilities} />
        {/* <HighlightCard
          className="liability-tot"
          label="Total Liabilities"
          value={currentData?.liabilities.totalLiabilities}
        /> */}
      </div>

      <div className="netWorth-tot">
        <HighlightCard
          className="networth"
          label="Networth"
          value={currentData?.netWorth}
        />
      </div>

      <div className="btn-stat-wrap">
        <div className="btn-wrap" onClick={goToStats}>
          <Button className="nxt-btn">Next</Button>
        </div>
      </div>

    </div>
  )
}

export default Balance
