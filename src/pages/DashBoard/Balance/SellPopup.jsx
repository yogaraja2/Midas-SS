import React, { useEffect } from 'react'
import { Dialog } from '@material-ui/core'
import ActionBtn from '../../../components/ActionBtn'
import Popup from '../../../components/Popup'
import Fetch from '../../../Api'
import { API } from '../../../config/apis'
import { Button, Grid } from '@material-ui/core'

function SellPopup({ onClose, data }) {

  const img = require(`../../../assets/img/${data.img}.svg`).default
  const values = data;

  useEffect(() => {

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('midasToken')}`
    }
    const params = values;

    Fetch.post(API.gamePlay.sellAsset, params, { headers })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })

  }, [])



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
        onSuccess={onClose}
      />

    </Popup>
  )
}

export default SellPopup
