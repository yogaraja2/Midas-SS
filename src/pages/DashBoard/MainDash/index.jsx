import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Grid } from '@material-ui/core'
import pointIcon from '../../../assets/img/pointsIcon.svg'
import dollar from '../../../assets/img/doller 2.svg'
import rankImg from '../../../assets/img/rank.svg'
import { useHistory, useLocation } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import { useSelector, useDispatch } from 'react-redux'
import { setNewGame } from '../../../redux/Action'
import { API } from '../../../config/apis'
import Fetch from '../../../Api'
import { setCurrentTurn, setEventCount, setEventsCost, setPageNo } from '../../../redux/Action'

function MainDash() {

    const [details, setDetails] = useState(null)

    const token = localStorage.getItem('midasToken')
    const auth = 'Bearer '.concat(token)

    useEffect(() => {
        Fetch.get(API.gamePlay.mainDashboard, {
            headers: {
                Authorization: auth
            }
        })
            .then(res => {
                setDetails(res.data)
            })
            .catch(err => {
                // console.log(err.message)
            })
    }, [])



    const gameLength = useSelector(state => state.selectAvatar.gameLength)
    const currentTurn = useSelector(state => state.dashboard.currentTurn)

    const turnsLeft = gameLength - currentTurn;
    const dispatch = useDispatch()

    const history = useHistory()

    const goToLeaderBoard = () => {
        history.push(commonRoute.leaderboard)
    }

    const goToNextTurn = () => {

        if (details?.key !== -1) {
            Fetch.get(API.gamePlay.cashFlow.nextTurn, {
                headers: {
                    Authorization: auth
                }
            })
                .then((res) => {
                    // console.log(res)
                    if (res.status === 200) {
                        dispatch(setCurrentTurn(currentTurn + 1))
                        dispatch(setEventCount(1))
                        dispatch(setEventsCost([{
                            eventName: '',
                            eventCost: ''
                        }]))
                        history.push(commonRoute.dashboard.cashFlow)
                    }
                })
                .catch((err) => {
                    // console.log(err)
                })
        }
        else {
            history.push(commonRoute.dashboard.cashFlow)
        }


    }

    const goToNewGame = () => {
        Fetch.get(API.gamePlay.cashFlow.newGame, {
            headers: {
                Authorization: auth
            }
        })
            .then(res => {
                // console.log(res.data)
                if (res.status === 200) {
                    dispatch(setNewGame())
                    dispatch(setPageNo(0))
                    history.push(commonRoute.gameOptions)
                }
            })
            .catch(err => {
                // console.log(err.message)
            })
    }

    return (
        <Grid container className="dash-main">
            <div className="header-wrap">
                {/* <div className="points-wrap">
                    <img src={pointIcon} alt='points' className="point-icon" />
                    <span className="points">{details?.totalScore}</span>
                </div> */}
                <div className="turns-sec">
                    <div className="title-wrap">
                        <h3>Turns Left</h3>
                    </div>
                    <div className="turn-count-wrap">
                        <span className="turn-count">{turnsLeft}</span>
                    </div>
                </div>
            </div>

            <div className="body-wrap">
                <div className="firstRow">
                    <div className="field-wrap">
                        <div className="fields">
                            <div className="head-line">Name</div>
                            <div className="content">{details?.name}</div>
                        </div>
                    </div>
                    <div className="field-wrap">
                        <div className="fields">
                            <div className="head-line">Rank</div>
                            <div className="content">
                                <span className="rank"><img src={rankImg} alt="rank" />{details?.leaderBoardRank}</span>
                            </div>
                        </div>
                    </div>
                    <div className="field-wrap">
                        <div className="fields">
                            <div className="head-line">Score</div>
                            <div className="content">
                                <span className="coin"><img src={pointIcon} alt='points' />&nbsp;{details?.totalScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="secRow">
                    <div className="field-wrap">
                        <div className="fields">
                            <div className="head-line">Cash Available</div>
                            <div className="content">
                                <span className="coin"><img src={dollar} alt="Coin" />&nbsp;${details?.cashAvailable}</span>
                            </div>
                        </div>
                    </div>
                    <div className="field-wrap">
                        <div className="fields">
                            <div className="head-line">Retirement Savings</div>
                            <div className="content">
                                <span className="coin"><img src={dollar} alt="Coin" />&nbsp;${details?.retirementSavings}</span>
                            </div>
                        </div>
                    </div>
                    <div className="field-wrap">
                        <div className="fields">
                            <div className="head-line">Networth</div>
                            <div className="content">
                                <span className="coin"><img src={dollar} alt="Coin" />&nbsp;${details?.networth}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-wrap">
                <div className="ld-btn-wrap" onClick={goToLeaderBoard}>
                    <div className="leaderboard-btn">View Leaderboard</div>
                </div>

                {currentTurn !== gameLength ? (
                    <div className="turn-btn-wrap" onClick={goToNextTurn}>
                        <div className="nxt-turn-btn">
                            <img src={require('../../../assets/img/nexTurn.svg').default} />
                            <span>{currentTurn === 0 ? "Start" : "Next"}Turn</span>
                        </div>
                    </div>
                ) : (
                        <div className="turn-btn-wrap" onClick={goToNewGame}>
                            <div className="leaderboard-btn">Start New Game</div>
                        </div>
                    )}
            </div>
        </Grid>
    )
}

export default MainDash
