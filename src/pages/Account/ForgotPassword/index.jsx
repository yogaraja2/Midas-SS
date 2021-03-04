import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { FormTextfield } from '../../../components/FormField'
import { useForm } from 'react-hook-form'
import LinkButton from '../../../components/LinkButton'
import { useHistory } from 'react-router-dom'
import SnackBar from '../../../components/SnackBar'
import '../Login/style.scss'
import { commonRoute } from '../../../config/routes'
import { getOriginPath } from '../../../utils/commonFunctions'
import API, { URL } from '../../../Api'


function ForgotPassword(props) {

    const credentials = {
        gmail: '',
    }

    const { control, errors, handleSubmit } = useForm(credentials)
    const history = useHistory()
    const allyProps = { control, error: errors }

    const [message, setMessage] = useState(null)
    const [Error, setError] = useState(false)

    const goToLogin = () => {
        history.push(`${getOriginPath(commonRoute.account)}/login`)
    }

    const handleForgot = (credentials) => {

        API.post(URL.forgotPassword, credentials)
            .then(res => {
                // console.log(res.data)
                if (res.data.status > 400) {
                    setError(true)
                    setMessage(res.data.message)
                }
                else {
                    history.push({
                        pathname: `${getOriginPath(commonRoute.account)}/resetPassword`,
                        state: { data: res.data }
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    function handleOnClose() {
        setError(false)
    }


    return (
        <div className="login-box-sec">
            <div className="header-sec">
                <h3 className="main-head" style={{ marginBottom: '20px', color: '#009ffd' }}>Forgot Password ?</h3>
            </div>

            <form className="field-wrap" onSubmit={handleSubmit(handleForgot)}>
                <div className="form-field">
                    <div className="label">Enter your e-mail</div>
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
                <div className="form-btns">
                    <Button type="submit" className="signin-btn">Submit</Button>
                    <span className="cont">or</span>
                    <LinkButton className="signup-btn" onClick={goToLogin}>Login</LinkButton>
                </div>
            </form>

            {Error && (
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

export default ForgotPassword
