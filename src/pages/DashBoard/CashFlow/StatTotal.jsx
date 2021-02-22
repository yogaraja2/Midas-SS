import React from 'react'
import { Grid } from '@material-ui/core'
import Entry from './Entry'

function StatTotal({ data }) {
  return (
    <Grid item container justify="flex-end" xs={12} className="stat-total-grid">
      <Grid item md={3} sm={4} xs={12} className="stat-total-wrap">
        <div>
          <div className="content-grid">
            <Entry endEven label="Total expenses" value={data?.totalExpenses} />
            <Entry endEven label="Annual" value={data?.annual} />
            <Entry
              endEven
              label="Savings available"
              value={data?.savingsAvailable}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default StatTotal
