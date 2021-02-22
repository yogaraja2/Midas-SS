import React, { useEffect, useState } from 'react'
import { FormDropdown, FormTextfield } from '../../../components/FormField'
import { Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { commonRoute } from '../../../config/routes'
import './styles.scss'
import API, { URL } from '../../../Api'
import { useSelector, connect } from 'react-redux'
import SnackBar from '../../../components/SnackBar'

function SelectRole() {
    // useSelector hook is used for get state from reducers. a.k.a: Receiver page
    // const getApiData = useSelector(state => state.signupData)

    const organizations = useSelector(state => state.organizations)
    const instructors = useSelector(state => state.instructors)

    const roleOptions = [
        { id: 'Individual', value: 'Individual' },
        { id: 'Student', value: 'Student' },
        { id: 'Instructor', value: 'Instructor' },
        { id: 'School_Admin', value: 'School Admin' }
    ]

    const subscriptionPeriod = [
        { id: 1, value: '1 Year' },
        { id: 2, value: '2 Year' },
        { id: 3, value: '3 Year' },
    ]

    const defaultValues = {
        role: null,
        organizationId: null,
        instructorId: null,
        newOrganization: '',
        subscription: null,
    }

    const [defaults, setDefaults] = useState(defaultValues)

    useEffect(() => {

        if (defaults.role === 'Individual') {
            setDefaults({
                ...defaults,
                organizationId: null,
                instructorId: null,
                newOrganization: '',
                subscription: null
            })
        }
        else if (defaults.role === 'Student') {
            setDefaults({
                ...defaults,
                newOrganization: '',
                subscription: null
            })
        }
        else if (defaults.role === 'Instructor') {
            setDefaults({
                ...defaults,
                instructorId: null,
                newOrganization: '',
                subscription: null
            })
        }
        else {
            setDefaults({
                ...defaults,
                newOrganization: '',
                subscription: null
            })
        }
    }, [defaults.role])


    const selectedOrg = organizations.filter((item) => item.id === defaults.organizationId)

    let selectedInstructor = [];
    if (selectedOrg.length) {
        selectedInstructor = instructors.filter((item) => item.tenant_key === selectedOrg[0].tenant_key)
    }

    const [message, setMessage] = useState(null)
    const [Error, setError] = useState(false)
    const [detail, setDetail] = useState(null)
    const [response, setResponse] = useState(null)
    const [count, setCount] = useState(false)

    const { control, errors, handleSubmit } = useForm(defaults)
    const history = useHistory()

    const otherProps = { control, error: errors }

    const token = localStorage.getItem('midasToken')
    const auth = 'Bearer '.concat(token)

    const onSubmitHandler = (values) => {

        let newObj = Object.assign({ pageNo: 1 }, values)
        // console.log('role sel')
        // console.log(newObj)

        API.post(URL.userprofile, newObj, {
            headers: {
                Authorization: auth
            }
        })
            .then((res) => {
                const { data } = res;
                setResponse(res)
                setCount(true)

                if (res?.status === 200) {
                    setMessage('Submitted Successfully...')
                }
            })
            .catch((err) => {
                setMessage(err.message)
                setCount(true)
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

    function handleOnClose(reason) {
        if (reason === 'clickaway') {
            return
        }
        if (response?.status === 200 && (response?.data?.role === 'Individual' || response?.data?.role === 'Student')) {
            history.push(commonRoute.gameOptions)
        }
        else if (response?.status === 200 && (response?.data?.role === 'Instructor')) {
            history.push(commonRoute.instructorLogin.instructorHome)
        }
        else if (response?.status === 200 && (response?.data?.role === 'School_Admin')) {
            history.push(commonRoute.schoolAdminLogin.schoolAdminHome)
        }
        setError(false)
    }

    return (
        <div className="role-box-sec">
            <h1 className="title">Select Your Role</h1>

            <form className="field-wrap" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="form-field">
                    <FormDropdown
                        id="role"
                        name="role"
                        className="role-field"
                        label="Choose the Role"
                        list={roleOptions}
                        placeholder="Select"
                        autoFocus
                        onChange={(e) => setDefaults({ ...defaults, role: e.target.value })}
                        rules={{ required: 'Please select your role' }}
                        {...otherProps}
                    />
                </div>
                <div className="form-field">
                    <FormDropdown
                        id="organizationId"
                        name="organizationId"
                        className="organizations-field"
                        label="Choose the organization"
                        list={organizations}
                        onChange={(e) => setDefaults({ ...defaults, organizationId: e.target.value })}
                        placeholder="Select"
                        rules={(defaults.role === 'Student' || defaults.role === 'Instructor') && { required: 'Please select your school' }}
                        disabled={!(defaults.role === 'Student' || defaults.role === 'Instructor') ? true : false}
                        {...otherProps}
                    />
                </div>
                <div className="form-field">
                    <FormDropdown
                        id="instructorId"
                        name="instructorId"
                        className="instructor-field"
                        label="Choose Your Instructor (Optional)"
                        list={selectedInstructor ? selectedInstructor : instructors}
                        onChange={(e) => setDefaults({ ...defaults, instructorId: e.target.value })}
                        placeholder="Select"
                        // rules={(role === 'Student') && { required: 'Please select your instructor' }}
                        disabled={!(defaults.role === 'Student') ? true : false}
                        {...otherProps}
                    />
                </div>
                <div className="form-field">
                    <FormTextfield
                        id="newOrganization"
                        name="newOrganization"
                        label="Create Organization"
                        placeholder="enter organization name"
                        required
                        onChange={(e) => setDefaults({ ...defaults, newOrganization: e.target.value })}
                        rules={(defaults.role === 'School_Admin') && { required: 'Please enter organization name' }}
                        disabled={!(defaults.role === 'School_Admin') ? true : false}
                        {...otherProps}
                    />
                </div>
                <div className="form-field">
                    <FormDropdown
                        id="subscription"
                        name="subscription"
                        className="subscription-field"
                        label="Choose subscription period"
                        list={subscriptionPeriod}
                        placeholder="Select"
                        onChange={(e) => setDefaults({ ...defaults, subscription: e.target.value })}
                        rules={(defaults.role === 'School_Admin') && { required: 'Please select subscription period' }}
                        disabled={!(defaults.role === 'School_Admin') ? true : false}
                        {...otherProps}
                    />
                </div>

                <div className="form-btns">
                    <Button type="submit" className="signin-btn">
                        Submit
                    </Button>
                </div>
            </form>
            {response && response.status && (
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

// const mapStateToProps = (state) => {
//     return {
//         response: state.response
//     }
// }

export default SelectRole
