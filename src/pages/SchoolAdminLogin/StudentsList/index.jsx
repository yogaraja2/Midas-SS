import React, { useState } from 'react'
import './style.scss'
import { Grid,Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import { useDispatch, useSelector } from 'react-redux'
import { setStudentDetail } from '../../../redux/Action'
import PostAPI from '../../../Api'
import { API } from '../../../config/apis'

function StudentsList() {

    const studentsList = useSelector(state => state.studentsList)

    const dispatch = useDispatch()


    const history = useHistory()

    const clickHandler = (item) => {

        const userId = {
            userId: item.userId
        }
        PostAPI.post(API.listApi.studentDetail, userId)
            .then(res => {
                console.log(res?.data)
                dispatch(setStudentDetail(res?.data))
                history.push(commonRoute.schoolAdminLogin.studentStats)
            })
            .catch(err => {
                console.log(err.message)
            })

    }

    const goToInstructorList = () => {
        history.push(commonRoute.schoolAdminLogin.instructorsList)
    }


    return (
        <Grid item xs={12} md={10} className="students-list-card">
            <div className="title">List Of Students</div>
            <Grid container className="students-list-wrap">
                {studentsList?.map((item, index) => (
                    <Grid item xs={12} key={index} className="student-field-wrap" onClick={() => clickHandler(item)}>
                        <Grid item xs={12} md={10}>{index + 1}</Grid>
                        <Grid item xs={12} md={10}>
                            <img src={require(`../../../assets/img/Avatar${item.avatarIcon * 1}.svg`).default} />
                        </Grid>
                        <Grid item xs={12} md={10}>{item.username}</Grid>
                        <Grid item xs={12} md={10}>{item.country}</Grid>
                        <Grid item xs={12} md={10}>{item.score}</Grid>
                    </Grid>
                ))}
            </Grid>
            <div className="btn-wrap">
                <Button className="back-btn" onClick={goToInstructorList}>Back </Button>
            </div>
        </Grid>
    )
}

export default StudentsList
