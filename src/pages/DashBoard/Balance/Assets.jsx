import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import AssetCard from '../../../components/AssetCard'
import SellPopup from './SellPopup'
import BuyPopup from './BuyPopup'
import { useSelector } from 'react-redux'

function Assets({ data, lbty, isEnablesell }) {

  const house = useSelector(state => state.dreams.house.houseName)
  const car = useSelector(state => state.dreams.car.carName)

  const assets = useSelector(state => state.assets)
  // console.log(assets)
  const [isSoldCar, setIsSoldCar] = useState(assets.isSoldCar)
  const [isSoldHouse, setIsSoldHouse] = useState(assets.isSoldHouse)

  useEffect(() => {
    setIsSoldCar(assets.isSoldCar)
    setIsSoldHouse(assets.isSoldHouse)
  }, [assets])

  const [confDlg, setConfDlg] = useState({
    status: false,
    data: null,
    isSell: false,
  })

  const handleClick = (data, isSell) => {
    setConfDlg({
      status: true,
      data,
      isSell,
    })
  }

  const handleDlgClose = () => {
    setConfDlg({
      status: false,
      data: null,
      isSell: false,
    })
  }


  const size = {
    xs: 6,
    md: 3
  }

  const allyProps = {
    size,
    transparent: true
  }

  return (
    <Grid container spacing={3} className="assets-wrap">
      <AssetCard
        name="carCard"
        img={car || "FullLoadedCar"}
        value={data?.vehicle?.price}
        isBought
        isSoldCar={isSoldCar}
        isEnablesell={car !== 'buyCar' ? isEnablesell : false}
        {...allyProps}
        onClick={car === 'buyCar' && isEnablesell && handleClick.bind(this, 0, false)}
        onSell={handleClick.bind(
          this,
          { img: car, name: 'car', type: 'vehicle', cost: data?.vehicle?.price, loanBalance: lbty?.carLoan.balance },
          true
        )}
      />
      <AssetCard
        name="houseCard"
        img={house || "Rambler"}
        value={data?.house?.price}
        isBought
        isSoldHouse={isSoldHouse}
        isEnablesell={house !== 'buyHouse' ? isEnablesell : false}
        {...allyProps}
        onClick={house === 'buyHouse' && isEnablesell && handleClick.bind(this, 1, false)}
        onSell={handleClick.bind(
          this,
          { img: house, name: 'House', type: 'mortgage', cost: data?.house?.price, loanBalance: lbty?.mortgageLoan.balance },
          true
        )}
      />
      <AssetCard name="savingsCard" img="savings" value={data?.chekingAndSavings} {...allyProps} />
      <AssetCard name="retireCard" img="retire" value={data?.retirementSavings} {...allyProps} />
      {confDlg.status && confDlg.isSell && isEnablesell && (
        <SellPopup onClose={handleDlgClose} data={confDlg.data} />
      )}
      {confDlg.status && !confDlg.isSell && (
        <BuyPopup onClose={handleDlgClose} type={confDlg.data} />
      )}
    </Grid>
  )
}

export default Assets
