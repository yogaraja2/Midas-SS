import React from 'react'
import { Grid } from '@material-ui/core'
import './style.scss'
import { useParams } from 'react-router-dom'
import { Copyright } from '../../components/Footer'

import Signup from './Signup'
import Login from './Login'
import SelectRole from './SelectRole'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

function Account() {
  const { screen } = useParams()

  function screenSwitch(screen) {
    switch (screen) {
      case 'signup': return <Signup />;
      case 'selectRole': return <SelectRole />;
      case 'forgotPassword': return <ForgotPassword />;
      case 'resetPassword': return <ResetPassword />;
      default: return <Login />;
    }
  }

  return (
    <Grid container className="account-wrapper">
      <Grid item xs={12} md={4} className="account-splash-sec">
        <div className="account-splash"></div>
      </Grid>

      <Grid item xs={12} md={8} className="account-screens">

        {screenSwitch(screen)}

        <div className="copyright-wrap">
          <Copyright />
        </div>
      </Grid>
    </Grid>
  )
}

export default Account
