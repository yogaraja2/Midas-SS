import React from 'react'
import { Grid } from '@material-ui/core'
import clsx from 'clsx'

export const PaddedContainer = ({
  className,
  size,
  container,
  spacing,
  justify,
  align,
  cJustify,
  cAlign,
  children
}) => {
  return (
    <Grid
      container
      className={clsx('padded-container', className)}
      spacing={spacing}
      justify={cJustify || 'center'}
      alignItems={cAlign}
    >
      <Grid
        item
        xs={11}
        {...size}
        container={container}
        justify={justify}
        alignItems={align}
      >
        {children}
      </Grid>
    </Grid>
  )
}
