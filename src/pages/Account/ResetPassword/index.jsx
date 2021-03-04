import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import SnackBar from '../../../components/SnackBar'
import { commonRoute } from '../../../config/routes'
import { Button } from '@material-ui/core'
import { FormTextfield } from '../../../components/FormField'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import API, { URL } from '../../../Api'
import { getOriginPath } from '../../../utils/commonFunctions'

function ResetPassword() {

    const { state } = useLocation()
    const gmail = state?.data.gmail;

    const defaultValues = {
        password: '',
        confirmPassword: '',
    }

    const { control, errors, handleSubmit } = useForm(defaultValues)
    const history = useHistory()

    const validationErr = {
        passwordValidation: 'Password must contain alphaNumeric',
        passwordLength: 'Required password length 8 to 20 letters',
    }

    const allyProps = { control, error: errors }

    const [message, setMessage] = useState(null)
    const [Error, setError] = useState(false)
    const [response, setResponse] = useState(null)

    const handleReset = (defaultValues) => {
        if (defaultValues.password !== defaultValues.confirmPassword) {
            setError(true)
            setMessage('Please enter identical password !!!')
        }
        else {
            const values = {
                gmail: gmail,
                password: defaultValues.password
            }
            // console.log(values)

            API.post(URL.forgotPassword, values)
                .then(res => {
                    setError(true)
                    setResponse(res.data)
                    setMessage('Password changed successfully...Please do login !!!')
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }
    function handleOnClose() {
        if (response?.update) {
            history.push(`${getOriginPath(commonRoute.account)}/login`)
        }
        setError(false)
    }

    return (
        <div className="signup-box-sec">
            <h1 className="signup-title">Reset-Password</h1>

            <form className="field-wrap" onSubmit={handleSubmit(handleReset)}>
                <div className="form-field">
                    <FormTextfield
                        className="pswd-field"
                        label="New Password"
                        name="password"
                        type="password"
                        placeholder="********"
                        onChange={(e) => e.target.value}
                        rules={{
                            required: 'Please enter your password',
                            minLength: {
                                value: 8,
                                message: validationErr.passwordLength
                            },
                            maxLength: {
                                value: 20,
                                message: validationErr.passwordLength
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                                message: validationErr.passwordValidation
                            }
                        }}
                        error={errors.password && errors.password.message}
                        hasValidation
                        {...allyProps}
                    />
                </div>

                <div className="form-field">
                    <FormTextfield
                        className="pswd-field"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="********"
                        onChange={(e) => e.target.value}
                        rules={{
                            required: 'Please enter your password',
                            minLength: {
                                value: 8,
                                message: validationErr.passwordLength
                            },
                            maxLength: {
                                value: 20,
                                message: validationErr.passwordLength
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                                message: validationErr.passwordValidation
                            }
                        }}
                        error={errors.confirmPassword && errors.confirmPassword.message}
                        {...allyProps}
                    />
                </div>

                <div className="form-btns">
                    <Button type="submit" className="signin-btn">
                        Submit
                    </Button>
                </div>
            </form>

            {response && response.update && (
                <SnackBar
                    openDialog={Error}
                    message={message}
                    onclose={handleOnClose}
                    severity={'success'}
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

export default ResetPassword
