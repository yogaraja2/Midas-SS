import React from 'react'
import { Grid } from '@material-ui/core'
import './style.scss'
import Login from './Login'
import { useParams } from 'react-router-dom'
import Signup from './Signup'
import { Copyright } from '../../components/Footer'
import SelectRole from './SelectRole'

function Account() {
  const { screen } = useParams()

  return (
    <Grid container className="account-wrapper">
      <Grid item xs={12} md={4} className="account-splash-sec">
        <div className="account-splash"></div>
      </Grid>

      <Grid item xs={12} md={8} className="account-screens">
        {screen === 'signup' ? (
          <Signup />
        ) : screen === 'selectRole' ? (
          <SelectRole />
        ) : (
          <Login />
        )}

        <div className="copyright-wrap">
          <Copyright />
        </div>
      </Grid>
    </Grid>
  )
}

export default Account
