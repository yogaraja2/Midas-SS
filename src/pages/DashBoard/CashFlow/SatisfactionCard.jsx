import React from 'react'
import clsx from 'clsx'
import { Grid } from '@material-ui/core'
import Card from '../../../components/Card'

function SatisfactionCard({ data }) {
  const Score = ({ label, value, noMargin, xsfull }) => (
    <Grid
      item
      sm={2}
      xs={xsfull ? 12 : 6}
      className={clsx(
        'score-wrap',
        value < 1 ? 'neg-sat' : 'pve-sat',
        !noMargin && 'mar-on-mob'
      )}
    >
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </Grid>
  )

  return (
    <Card className="satisfiction-card" transparent>
      <Grid container justify="space-around" className="satisfiction-grid">
        <Score xsfull label="Housing" value={data?.housePoints} noMargin />
        <Score label="Living Expenses" value={data?.livingExpensesPoints} />
        <Score label="Entertainment" value={data?.entertainmentPoints} />
        <Score label="Vehicle" value={data?.vehiclePoints} />
        <Score label="Dream" value={data?.dreamPoints} />
      </Grid>
    </Card>
  )
}

export default SatisfactionCard
