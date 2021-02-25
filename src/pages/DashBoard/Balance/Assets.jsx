import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import AssetCard from '../../../components/AssetCard'
import SellPopup from './SellPopup'
import BuyPopup from './BuyPopup'
import { useSelector } from 'react-redux'

function Assets({ data, obj, isEnablesell }) {

  const house = useSelector(state => state.dreams.house.houseName)
  const car = useSelector(state => state.dreams.car.carName)

  const [isSoldCar, setIsSoldCar] = useState(false)
  const [isSoldHouse, setIsSoldHouse] = useState(false)

  const [confDlg, setConfDlg] = useState({
    status: false,
    data: null,
    isSell: false,
    type: null,
  })
  // console.log(confDlg)

  const handleClick = (data, isSell) => {
    setConfDlg({
      status: true,
      data,
      isSell,
      type: data.name,
    })
  }

  const handleDlgClose = () => {
    setConfDlg({
      status: false,
      data: null,
      isSell: false,
      type: confDlg.type,
    })
    if (confDlg.type === 'car') {
      setIsSoldCar(true)
    } else {
      setIsSoldHouse(true)
    }
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
        isEnablesell={isSoldCar ? false : isEnablesell}
        {...allyProps}
        onClick={isSoldCar && handleClick.bind(this, 0, false)}
        onSell={handleClick.bind(
          this,
          { img: car, name: 'car', type: 'vehicle', cost: data?.vehicle?.price, loanBalance: obj?.carLoan.balance },
          true
        )}
      />
      <AssetCard
        name="houseCard"
        img={house || "Rambler"}
        value={data?.house?.price}
        isBought
        isEnablesell={isSoldHouse ? false : isEnablesell}
        {...allyProps}
        onClick={isSoldHouse && handleClick.bind(this, 1, false)}
        onSell={handleClick.bind(
          this,
          { img: house, name: 'House', type: 'mortgage', cost: data?.house?.price, loanBalance: obj?.mortgageLoan.balance },
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
