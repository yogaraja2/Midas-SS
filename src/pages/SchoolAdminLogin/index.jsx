import React from 'react'
import { Grid } from '@material-ui/core'
import RouteMapper from '../../utils/Router/RouteMapper'
import { schoolAdminRoutes } from './routes'
import './style.scss'

function SchoolAdminLogin() {
    return (
        <>
            <Grid
                container
                justify="center"
                alignContent="center"
                className="schoolAdmin-login"
            >
                <RouteMapper data={schoolAdminRoutes} />
            </Grid>
        </>
    )
}

export default SchoolAdminLogin
