import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RedirectRouter from './RedirectRoute'

const RouteMapper = ({ data }) => {
  return (
    <Switch>
      {data
        .filter((f) => !!f.props?.path)
        .map((i, index) => (
          <Route key={index} {...i.props} />
        ))}
      {data
        .filter((f) => !!f.redirection?.path)
        .map((i, index) => (
          <RedirectRouter key={index} {...i.redirection} />
        ))}
    </Switch>
  )
}
export default RouteMapper
