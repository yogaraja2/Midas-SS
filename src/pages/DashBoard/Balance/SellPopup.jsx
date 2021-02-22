import React from 'react'
import { Dialog } from '@material-ui/core'
import ActionBtn from '../../../components/ActionBtn'
import Popup from '../../../components/Popup'

function SellPopup({ onClose, data }) {
  const img = require(`../../../assets/img/${data.img}.svg`).default
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
