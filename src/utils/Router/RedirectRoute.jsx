import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RedirectRouter = ({
  component: Component,
  to: redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.path === redirectPath) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: redirectPath }} />
        }
      }}
    />
  )
}

export default RedirectRouter
