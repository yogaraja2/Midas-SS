import React, { useState, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import clsx from 'clsx'
import './useStyle.scss'
import doller from '../../../assets/img/doller 2.svg'
import unlock from '../../../assets/img/lock.svg'
import lock from '../../../assets/img/lock1.svg'
import { commonRoute } from '../../../config/routes'
import { useHistory } from 'react-router-dom'
import Textfield from '../../../components/Textfield'
import SnackBar from '../../../components/SnackBar'
import API, { URL } from '../../../Api'
import { setAvatarId,setPageNo } from '../../../redux/Action'
import { useDispatch } from 'react-redux'

const AvatarOptions = ({ label, imgUrl, id, avatar, setAvatar }) => {
    return (
        <div
            className={clsx('option-wrap', avatar === id && 'selected')}
            onClick={setAvatar.bind(this, id)}
        >
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
            {/* <div className="option-label">{label}</div> */}
        </div>
    )
}

const LengthOptions = ({ id, dollerImg, text1, text2, gameLength, setGameLength }) => {
    return (
        <Grid item md={3} sm={12} xs={12}
            className={clsx('lenrole-button', { "selected-lenrole": gameLength === id })}
            onClick={setGameLength.bind(this, id)}
        >
            <div className="selected-lenrole">
                <div className="button-text-wrap">
                    <span className="button-text1">{text1}</span><br />
                    <span className="button-text2">{text2}</span>
                </div>
                <img src={dollerImg} alt={id} className="doller-icon" />
            </div >
        </Grid >
    )
}

const RoleOptions = ({ id, title, role, setRole }) => {
    return (
        <Grid item md={3} sm={12} xs={12}
            className={clsx('lenrole-button', { "selected-lenrole": role === id })}
            onClick={setRole.bind(this, id)}
        >
            <div className="button-text-wrap" style={{ marginTop: '20px' }}>
                <span className="button-text1">{title}</span>
            </div>
            <img src={(role === id) ? unlock : lock} alt={id} className="doller-icon" style={{ bottom: '20px' }} />
        </Grid>
    )
}

function SelectAvatar() {

    const dispatch = useDispatch()

    const [avatar, setAvatar] = useState(1)
    const [salary, setSalary] = useState(121000)
    const [gameLength, setGameLength] = useState(10)
    const [role, setRole] = useState('easy')

    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [response, setResponse] = useState(null)

    const allyProps = { avatar, setAvatar }
    const otherLen = { gameLength, setGameLength }
    const otherRol = { role, setRole }

    const history = useHistory()

    const min = 40000;
    const max = 150000;

    const salaryHandler = () => {
        const randomSalary = Math.round(Math.round((Math.random() * (max - min) + min) / 1000) * 1000);
        setSalary(randomSalary)
    }


    const initialValues = {
        avatarIcon: avatar,
        income: salary,
        gameLength: gameLength,
        role: role,
        pageNo: 2,
    }

    const token = localStorage.getItem('midasToken')
    const auth = 'Bearer '.concat(token)

    const goToSelectDream = (initialValues) => {
        // console.log(initialValues)
        dispatch(setAvatarId(initialValues))


        API.post(URL.gameDetails, initialValues, {
            headers: {
                Authorization: auth
            }
        })
            .then((res) => {
                setResponse(res)
                dispatch(setPageNo(2))
                history.push(commonRoute.selectDreams)
                // if (response?.status) {
                //     history.push(commonRoute.selectDreams)
                // }
            })
            .catch((err) => {
                console.log(err.message)
                setErrMsg(err.message)
            })
    }

    // const handleIncomeValueChanges = (e) => {
    //     setIncome(+e.target.value)
    // }

    function handleOnClose(reason) {
        if (reason === 'clickaway') {
            return
        }
        setError(false)
    }

    const goToHome = () => {
        history.push(commonRoute.gameOptions)
    }

    return (
        <Grid item xs={11} md={10} className="select-avatar-card">
            <div className="header-sec">
                <h3 className="main-head">Select Your Avatar</h3>
            </div>
            <Grid
                container
                justify="space-around"
                alignContent="center"
                className="options-selector"
            >
                <AvatarOptions
                    label="Admin"
                    imgUrl={`Avatar1`}
                    id={1}
                    {...allyProps}
                />
                <AvatarOptions
                    label="Admin"
                    imgUrl={`Avatar2`}
                    id={2}
                    {...allyProps}
                />
                <AvatarOptions
                    label="Admin"
                    imgUrl={'Avatar3'}
                    id={3}
                    {...allyProps}
                />
                <AvatarOptions
                    label="Admin"
                    imgUrl={`Avatar4`}
                    id={4}
                    {...allyProps}
                />
                <AvatarOptions
                    label="Admin"
                    imgUrl={'Avatar5'}
                    id={5}
                    {...allyProps}
                />
            </Grid>

            <Grid className="income-wrap">
                <div className="header-sec">
                    <h3 className="main-head">Starting Salary</h3>
                </div>
                <div className="salary-wraps">
                    <div className="starting-salary">
                        <div className="dollar-img">
                            <img src={require(`../../../assets/img/doller 2.svg`).default} />
                        </div>
                        <div className="money">{salary}</div>
                    </div>
                    <div className="change-salary" onClick={salaryHandler}>
                        Change Salary
                    </div>
                </div>
            </Grid>

            <div className="gameLength-wrap">
                <div className="header-sec">
                    <h3 className="main-head">Game Length</h3>
                </div>
                <Grid container className="lenrole-button-wrap">
                    <LengthOptions
                        id={10}
                        dollerImg={doller}
                        text1="Short"
                        text2="10 Turns"
                        {...otherLen} />
                    <LengthOptions
                        id={20}
                        dollerImg={doller}
                        text1="Medium"
                        text2="20 Turns"
                        {...otherLen} />
                    <LengthOptions
                        id={40}
                        dollerImg={doller}
                        text1="Long"
                        text2="40 Turns"
                        {...otherLen} />
                </Grid>
            </div>

            <div className="gameLength-wrap">
                <div className="header-sec">
                    <h3 className="main-head">Game Mode</h3>
                </div>
                <Grid container className="lenrole-button-wrap">
                    <RoleOptions
                        id="easy"
                        title="Easy"
                        {...otherRol}
                    />
                    <RoleOptions
                        id="standard"
                        title="Standard"
                        {...otherRol}
                    />
                    <RoleOptions
                        id="advance"
                        title="Advance"
                        {...otherRol}
                    />
                </Grid>
            </div>

            <div className="btn-wrap">
                <Button className="btn" onClick={goToHome}>Back</Button>
                <Button className="btn" onClick={() => goToSelectDream(initialValues)}>Next</Button>
            </div>

            {error &&
                (<SnackBar
                    openDialog={error}
                    message={errMsg}
                    onclose={handleOnClose}
                    severity={'info'}
                />)
            }
        </Grid>
    )
}

export default SelectAvatar
