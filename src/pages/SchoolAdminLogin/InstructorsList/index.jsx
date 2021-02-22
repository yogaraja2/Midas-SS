import React, { useState } from 'react'
import './style.scss'
import { Grid, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import { useDispatch } from 'react-redux'
import { setStudentList } from '../../../redux/Action'
import { API } from '../../../config/apis'
import useFetch from '../../../hooks/useFetch'
import PostAPI from '../../../Api'

function InstructorsList() {

    const { data } = useFetch({
        url: API.listApi.instructorsList
    })

    console.log(data)

    const dispatch = useDispatch()


    const history = useHistory()
    const clickHandler = (item) => {

        const instructor = {
            gmail: item.gmail
        }

        PostAPI.post(API.listApi.studentsList, instructor)
            .then(res => {
                console.log(res?.data)
                dispatch(setStudentList(res?.data))
                if (res.status === 200) {
                    history.push(commonRoute.schoolAdminLogin.studentsList)
                }
            })
            .catch(err => {
                console.log(err.message)
            })

    }

    const goToHome = () => {
        history.push(commonRoute.schoolAdminLogin.schoolAdminHome)
    }


    return (
        <Grid item xs={12} md={10} className="instructors-list-card">
            <div className="title">List Of Instructors</div>
            <Grid container className="instructors-list-wrap">
                {data?.map((item, index) => (
                    <Grid item xs={12} key={index} className="instructor-field-wrap" onClick={() => clickHandler(item)}>
                        <Grid item xs={12} md={10}>{index + 1}</Grid>
                        <Grid item xs={12} md={10}>{item.username}</Grid>
                        <Grid item xs={12} md={10}>{item.country}</Grid>
                    </Grid>
                ))}
            </Grid>
            <div className="btn-wrap">
                <Button className="back-btn" onClick={goToHome}>Back </Button>
            </div>
        </Grid>
    )
}

export default InstructorsList
