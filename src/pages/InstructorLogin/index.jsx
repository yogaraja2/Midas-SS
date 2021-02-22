import React from 'react'
import { Grid } from '@material-ui/core'
import RouteMapper from '../../utils/Router/RouteMapper'
import { instructorRoutes } from './routes'
import './style.scss'

function InstructorLogin() {
    return (
        <>
            <Grid
                container
                justify="center"
                alignContent="center"
                className="instructor-login"
            >
                <RouteMapper data={instructorRoutes} />
            </Grid>
        </>
    )
}

export default InstructorLogin
