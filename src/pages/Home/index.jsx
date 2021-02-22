import React from 'react'
import { Grid } from '@material-ui/core'
import { homeRoutes } from './routes'
import RouteMapper from '../../utils/Router/RouteMapper'
import './style.scss'

function Home() {
  return (
    <>
      <Grid
        container
        justify="center"
        alignContent="center"
        className="game-control-home"
      >
        <RouteMapper data={homeRoutes} />
      </Grid>
    </>
  )
}

export default Home
