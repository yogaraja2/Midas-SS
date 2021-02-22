import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { commonRoute } from '../../../config/routes'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import './style.scss'
import { useSelector } from 'react-redux'

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
  const [selected, setSelected] = useState('new')
  const [isLogged, setIsLogged] = useState(false)
  // const currentTurn = useSelector(state => state.dashboard.currentTurn)
  const pageNo = useSelector(state => state.pageNo)

  const [page, setPage] = useState(pageNo)

  // useEffect(() => {
  //   currentTurn > 1 && setIsLogged(true)
  // }, [])

  useEffect(() => {
    setPage(pageNo)
  }, [page])

  const allyProps = { selected, setSelected }
  const history = useHistory()

  const clickHandler = () => {
    if (selected === 'leaderboard') {
      history.push(commonRoute.leaderboard)
    } else if (selected == 'new') {
      history.push(commonRoute.selectAvatar)
    } else {
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
