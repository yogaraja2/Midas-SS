import { Button, Grid } from '@material-ui/core'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import AssetCard from '../../../components/AssetCard'
import Popup from '../../../components/Popup'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
import { API } from '../../../config/apis'
import { setDream, setIsCarSold, setIsHouseSold } from '../../../redux/Action'

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
      className={clsx('buying-card', selected?.id === data?.id && 'selected')}
    >
      <AssetCard
        {...allyProps}
        img={data.img}
        name='buyCard'
        value={data.cost}
        onClick={handleClick.bind(this, data)}
      />
      <p className="item-name">{data.name}</p>
    </Grid>
  )
}

// type 0 - car, type 1 - house
function BuyPopup({ onClose, type }) {

  const dreams = useSelector(state => state.dreams)
  // console.log(dreams)
  // asset lists
  // prettier-ignore
  const cars = [
    { id: 1, type: 'Vehicle', name: 'Relisble  Car', img: 'RelisibleCar', cost: 5000 },
    { id: 2, type: 'Vehicle', name: 'Economy Car', img: 'EconomyCar', cost: 12000 },
    { id: 3, type: 'Vehicle', name: 'Full Loaded Car', img: 'FullLoadCar', cost: 20000 },
    { id: 4, type: 'Vehicle', name: 'Luxury Car', img: 'LuxuryCar', cost: 27000 }
  ]
  // prettier-ignore
  const houses = [
    { id: 1, type: 'House', name: 'Studio Appartment', img: 'StudioApt', cost: 100000 },
    { id: 2, type: 'House', name: 'Fixer Upper', img: 'FixerUp', cost: 170000 },
    { id: 3, type: 'House', name: 'Rambler', img: 'Rambler', cost: 230000 },
    { id: 4, type: 'House', name: 'Mansion', img: 'Mansion', cost: 310000 }
  ]

  const dispatch = useDispatch()
  const [selected, setSelected] = useState(null)
  // console.log('selected')
  // console.log(selected)

  const { fetchBuy, buyHadResult, buyInitResult } = useFetch({
    name: 'buy',
    method: 'POST',
    url: API.gamePlay.buyAssets,
    params: selected,
    initLoad: false,
    onSuccess: onClose,
  })

  useEffect(() => {
    if (buyHadResult) {
      if (selected.type === 'Vehicle') {
        const dreamsData = {
          dream: dreams.dream,
          car: buyInitResult,
          house: dreams.house,
        }
        dispatch(setDream(dreamsData))
        dispatch(setIsCarSold(false))
      }
      else if (selected.type === 'House') {
        const dreamsData = {
          dream: dreams.dream,
          car: dreams.car,
          house: buyInitResult,
        }
        dispatch(setDream(dreamsData))
        dispatch(setIsHouseSold(false))
      }
    }
  }, [buyHadResult])



  const handleClick = (data) => {
    setSelected(data)
    // console.log(data)
  }

  const assetName = !!type ? 'house' : 'car'
  const buyingAsset = !!type ? houses : cars

  return (
    <Popup
      className="dash-buy-asset-dlg"
      title={`Interested in buying ${assetName}`}
      onClose={onClose}
    >
      <Grid container spacing={3} className="asset-list-wrap">
        {buyingAsset.map((item, index) => (
          <BuyingCard
            key={index}
            data={item}
            selected={selected}
            handleClick={handleClick}
          />
        ))}
      </Grid>
      <div className="btn-wrap">
        <Button className="buy-btn" onClick={fetchBuy}>
          Buy
        </Button>
      </div>
    </Popup>
  )
}

export default BuyPopup
