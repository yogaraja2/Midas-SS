import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import clsx from 'clsx'

const useStyle = makeStyles({
  rounded: {
    borderRadius: 15,
    padding: '36px 24px',
    background: (props) => {
      const opacity =
        props.transparent === true
          ? 0.8
          : !!props.transparent || props.transparent === 0
          ? props.transparent
          : 1
      return `rgba(255, 255, 255, ${opacity})`
    }
  }
})

function Card({ children, className, transparent, ...rest }) {
  const classes = useStyle({ transparent })

  return (
    <Paper
      elevation={0}
      square={false}
      className={clsx('card-block', className)}
      classes={classes}
      {...rest}
    >
      {children}
    </Paper>
  )
}

export default Card
