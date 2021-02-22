import React from 'react'
import clsx from 'clsx'
import './style.scss'
import DraggableScroll from '../../components/DraggableScroll'

const YearBox = ({ value, label, onClick, years }) => (
  <div
    style={{ minWidth: `calc(100%/${years < 10 ? years : 10})` }}
    className={clsx('year-box', {
      'fill-bar': value >= label,
      selected: value === label
    })}
  >
    <div className="selection-circle" onClick={onClick.bind(this, label)}>
      {label}
    </div>
  </div>
)

function YearBar({ years = 10, value, onClick, clickableTill = 'any' }) {
  const handleClick = (value) => {
    if (clickableTill === 'any' || value <= clickableTill) {
      onClick && onClick(value)
    }
  }

  const yearStepper = () => {
    let renderYearBox = []
    for (let i = 1; i <= years; i++) {
      renderYearBox.push(
        <YearBox
          key={i}
          value={value}
          onClick={handleClick}
          label={i}
          years={years}
        />
      )
    }
    return renderYearBox
  }

  return (
    <DraggableScroll
      hasNavigation
      disableScroll={years <= 10}
      className="year-bar-wrap"
    >
      {yearStepper()}
    </DraggableScroll>
  )
}

export default YearBar
