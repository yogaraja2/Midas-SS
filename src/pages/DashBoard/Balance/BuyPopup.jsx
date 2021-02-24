import { Button, Grid } from '@material-ui/core'
import clsx from 'clsx'
import React, { useState } from 'react'
import AssetCard from '../../../components/AssetCard'
import Popup from '../../../components/Popup'

const BuyingCard = ({ data, selected, handleClick }) => {
  const allyProps = {
    className: 'buy-asset-card'
  }

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      className={clsx('buying-card', selected === data.id && 'selected')}
    >
      <AssetCard
        {...allyProps}
        img={data.img}
        value={data.value}
        onClick={handleClick.bind(this, data.id)}
      />
      <p className="item-name">{data.name}</p>
    </Grid>
  )
}

// type 0 - car, type 1 - house
function BuyPopup({ onClose, type }) {
  // asset lists
  // prettier-ignore
  const cars = [
    { id: 1, name: 'Relisble  Car', img: 'RelisibleCar', value: 60000 },
    { id: 2, name: 'Economy Car', img: 'EconomyCar', value: 80000 },
    { id: 3, name: 'Full Loaded Car', img: 'FullLoadCar', value: 120000 },
    { id: 4, name: 'Luxury Car', img: 'LuxuryCar', value: 1200000 }
  ]
  // prettier-ignore
  const houses = [
    { id: 1, name: 'Studio Appartment', img: 'StudioApt', value: 60000 },
    { id: 2, name: 'Fixer Upper', img: 'FixerUp', value: 80000 },
    { id: 3, name: 'Rambler', img: 'Rambler', value: 120000 },
    { id: 4, name: 'Mansion', img: 'Mansion', value: 1200000 }
  ]

  const [selected, setSelected] = useState(null)

  const handleClick = (id) => setSelected(id)

  const assetName = !!type ? 'house' : 'car'
  const buyingAsset = !!type ? houses : cars

  return (
    <Popup
      className="dash-buy-asset-dlg"
      title={`Interested in buying ${assetName}`}
      onClose={onClose}
    >
      <Grid container spacing={3} className="asset-list-wrap">
        {buyingAsset.map((i, index) => (
          <BuyingCard
            key={index}
            data={i}
            selected={selected}
            handleClick={handleClick}
          />
        ))}
      </Grid>
      <div className="btn-wrap">
        <Button className="buy-btn" onClick={onClose}>
          Buy
        </Button>
      </div>
    </Popup>
  )
}

export default BuyPopup
