import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { commonRoute } from '../../../config/routes'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import './style.scss'
import { API } from '../../../config/apis'
import Fetch from '../../../Api'
import { setNewGame, setPageNo } from '../../../redux/Action'
import { useDispatch, useSelector } from 'react-redux'

const Options = ({ label, imgUrl, id, selected, setSelected }) => {
  return (
    <div
      className={clsx('option-wrap', { selected: selected === id })}
      onClick={setSelected.bind(this, id)}
    >
      <div className="option-label">{label}</div>
      <div className="option-image">
        <div className="selector-bg">
          <div className="image-warp">
            <img
              src={require(`../../../assets/img/${imgUrl}.svg`).default}
              alt={label}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function GameControl() {

  const dispatch = useDispatch();

  const [selected, setSelected] = useState('new')

  const currentTurn = useSelector(state => state.dashboard.currentTurn)
  const pageNo = useSelector(state => state.pageNo)

  const [page, setPage] = useState(pageNo)

  useEffect(() => {
    setPage(pageNo)
  }, [page])

  const allyProps = { selected, setSelected }
  const history = useHistory()

  const clickHandler = () => {

    if (selected === 'leaderboard') {
      history.push(commonRoute.leaderboard)
    }
    else if (selected == 'new') {

      if (currentTurn === 0) {
        history.push(commonRoute.selectAvatar)
      }
      else {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('midasToken')}`
        }
        Fetch.get(API.gamePlay.cashFlow.newGame, { headers })
          .then(res => {
            // console.log(res.data)
            if (res.status === 200) {
              dispatch(setNewGame())
              dispatch(setPageNo(0))
              history.push(commonRoute.selectAvatar)
            }
          })
          .catch(err => {
            // console.log(err.message)
          })
      }
    }
    else {
      history.push(commonRoute.dashboard.mainDash)
    }
  }

  return (
    <Grid item xs={11} md={10} className="game-option-card">
      <Grid
        container
        justify="space-around"
        alignContent="center"
        className="options-selector"
      >
        <Options
          label="Leader Board"
          imgUrl={`Leader-Board`}
          id="leaderboard"
          {...allyProps}
        />
        <Options label="New" imgUrl={`New`} id="new" {...allyProps} />
        {page > 0 && (<Options label="Resume" imgUrl={'Resume'} id="resume" {...allyProps} />)}
      </Grid>
      <div className="btn-wrap">
        <Button className="nxt-btn" onClick={clickHandler}>
          Next
        </Button>
      </div>
    </Grid>
  )
}

export default GameControl
