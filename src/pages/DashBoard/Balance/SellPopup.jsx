import React, { useEffect } from 'react'
import { Dialog } from '@material-ui/core'
import ActionBtn from '../../../components/ActionBtn'
import Popup from '../../../components/Popup'
import Fetch from '../../../Api'
import { API } from '../../../config/apis'
import { Button, Grid } from '@material-ui/core'
import useFetch from '../../../hooks/useFetch'
import { setDream, setIsCarSold, setIsHouseSold, setSoldCar, setSoldHouse } from '../../../redux/Action'
import { useDispatch, useSelector } from 'react-redux'

function SellPopup({ onClose, data }) {

  const dreams = useSelector(state => state.dreams)

  const img = require(`../../../assets/img/${data.img}.svg`).default
  const values = data;

  const { fetchSell, sell, isSellLoading, sellError, sellHadResult, sellInitResult, loadSell, setSell } = useFetch({
    name: 'sell',
    method: 'POST',
    url: API.gamePlay.sellAsset,
    params: values,
    initLoad: false,
    onSuccess: onClose,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (sellHadResult) {
      // console.log('result')
      // console.log(values)
      if (sellInitResult.type === 'car') {
        const dreamsData = {
          dream: dreams.dream,
          car: { id: 0, carName: "buyCar", cost: 0 },
          house: dreams.house,
        }
        dispatch(setDream(dreamsData))
        dispatch(setIsCarSold(true))
        dispatch(setSoldCar(values.img))
      }
      else if (sellInitResult.type === 'House') {
        const dreamsData = {
          dream: dreams.dream,
          car: dreams.car,
          house: { id: 0, houseName: "buyHouse", cost: 0 },
        }
        dispatch(setDream(dreamsData))
        dispatch(setIsHouseSold(true))
        dispatch(setSoldHouse(values.img))
      }
    }
  }, [sellHadResult])



  return (
    <Popup
      className="das-bal-sell-asst-dlg"
      title={`Are you sure you want to sell this ${data.name}?`}
      onClose={onClose}
      noClose
    >
      <div className="asset-wrap">
        <img src={img} alt="asset" className="asset-img" />
      </div>

      <ActionBtn
        className="dlg-action-btn"
        onFail={onClose}
        onSuccess={fetchSell}
      />

    </Popup>
  )
}

export default SellPopup


// console.log('fetchSell')
  // console.log(fetchSell)
  // console.log('sell')
  // console.log(sell)
  // console.log('isSellLoading')
  // console.log(isSellLoading)
  // console.log('sellError')
  // console.log(sellError)
  // console.log('sellHadResult')
  // console.log(sellHadResult)
  // console.log('sellInitResult')
  // console.log(sellInitResult)
  // console.log('loadSell')
  // console.log(loadSell)
  // console.log('setSell')
  // console.log(setSell)
