import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { FormTextfield } from '../../../components/FormField'
import { useForm } from 'react-hook-form'
import LinkButton from '../../../components/LinkButton'
import './style.scss'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import { getOriginPath } from '../../../utils/commonFunctions'
import API, { URL } from '../../../Api'
import SnackBar from '../../../components/SnackBar'
import { setLoginData, setAvatarId, setCurrentTurn, setNetworth, setSavingsAmt, setSurplusAmt, setPageNo } from '../../../redux/Action'
import { useDispatch } from 'react-redux'

function Login() {

  const dispatch = useDispatch()

  const credentials = {
    gmail: '',
    password: '',
  }

  const { control, errors, handleSubmit } = useForm(credentials)
  const history = useHistory()

  const [message, setMessage] = useState(null)
  const [Error, setError] = useState(false)
  const [response, setResponse] = useState(null)
  const [count, setCount] = useState(false)

  const handleLogin = (values) => {


    API.post(URL.login, values)
      .then((res) => {

        const { data } = res
        console.log(data)
        dispatch(setLoginData(data))
        setResponse(data)
        setCount(true)

        if (data.token) {
          localStorage.setItem('midasToken', data.token)
          setMessage('Login Successfull...')
        }
        else if (data.status) {
          setMessage(data.message)
        }
      })
      .catch((err) => {
        // setMessage(err.message)
        setCount(true)
        setMessage('Invalid password, plese enter valid password !!!')
      })
  }

  useEffect(() => {
    if (count) {
      if (response) {
        setError(true)
        setCount(false)
      } else {
        setError(true)
        setCount(false)
        setMessage('Something went wrong')
      }
    }
  }, [response, count])

  const goToSignup = () => {
    history.push(`${getOriginPath(commonRoute.account)}/signup`)
  }

  const allyProps = { control, error: errors }

  function handleOnClose() {
    
    if (response?.role === 'Individual' || response?.role === 'Student') {
      if (response?.pageNo === 1) {
        history.push(commonRoute.gameOptions)
      }
      else if (response.pageNo === 2) {
        history.push(commonRoute.selectAvatar)
      }
      else if (response.pageNo === 3) {

        const avatarData = {
          avatarIcon: response.avatarIcon,
          income: response.income,
          gameLength: response.gameLength,
          gameMode: response.gameMode
        }
        dispatch(setAvatarId(avatarData))
        dispatch(setCurrentTurn(response.currentTurn))
        dispatch(setNetworth(response.networth))
        dispatch(setSurplusAmt(response.savingsAvailable))
        dispatch(setSavingsAmt(response.cashAvailable))
        dispatch(setPageNo(response.pageNo))
        history.push(commonRoute.dashboard.mainDash)
      }
    }
    else if (response?.role === 'Instructor') {
      history.push(commonRoute.instructorLogin.instructorHome)
    }
    else if (response?.role === 'School_Admin') {
      history.push(commonRoute.schoolAdminLogin.schoolAdminHome)
    }
    setError(false)
  }

  return (
    <div className="login-box-sec">
      <div className="header-sec">
        <h3 className="main-head">Welcome to Midas</h3>
        <div className="sign-up-sec">
          <div className="cont">New Here?</div>
          <LinkButton className="create-btn" onClick={goToSignup}>Create an Account</LinkButton>
        </div>
      </div>

      <form className="field-wrap" onSubmit={handleSubmit(handleLogin)}>
        <div className="form-field">
          <div className="label">Email Id</div>
          <FormTextfield
            className="email-field"
            id="gmail"
            name="gmail"
            placeholder="johnsmith@abc.com"
            onChange={(e) => e.target.value}
            rules={{
              required: 'Please enter your email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address'
              }
            }}
            {...allyProps}
          />
        </div>

        <div className="form-field">
          <div className="label psswd-ctrl">
            <div className="psswd-label">Password</div>
            <LinkButton className="forget-psswd-btn">
              Forgot Password?
            </LinkButton>
          </div>
          <FormTextfield
            className="pswd-field"
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={(e) => e.target.value}
            rules={{ required: 'Please enter your password' }}
            {...allyProps}
          />
        </div>

        <div className="form-btns">
          <Button type="submit" className="signin-btn">Login</Button>
          <span className="cont">or</span>
          <LinkButton className="signup-btn" onClick={goToSignup}>Signup</LinkButton>
        </div>
      </form>
      {response && response.token && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'success'}
        />
      )}
      {response && response.status && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'info'}
        />
      )}
      {!response && (
        <SnackBar
          openDialog={Error}
          message={message}
          onclose={handleOnClose}
          severity={'error'}
        />
      )}
    </div>
  )
}

export default Login
