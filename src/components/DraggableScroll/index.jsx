import React, { useState } from 'react'
import clsx from 'clsx'
import ScrollContainer from 'react-indiana-drag-scroll'
import { IconButton } from '@material-ui/core'
import {
  FaChevronLeft as LeftIcon,
  FaChevronRight as RIghtIcon,
  FaChevronUp as UpIcon,
  FaChevronDown as DownIcon
} from 'react-icons/fa'
import './style.scss'

function DraggableScroll({
  children,
  hasNavigation, // enable arrow guide
  className,
  disableScroll,
  dragClass, // class for dragging container
  axis = 'x', // scroll x axis or y axis or both (values: x, y, xy)
  ...rest
}) {
  const [isHold, setHold] = useState(false)

  // navigate based on axis given vs isIncrement
  const handleNav = (isIncrement) => {
    const axisX = axis === 'x' ? (isIncrement ? 100 : -100) : 0
    const axisY = axis === 'y' ? (isIncrement ? 100 : -100) : 0

    document.querySelector('.draggable-sec').scrollBy(axisX, axisY)
  }

  return (
    <div
      onMouseDown={setHold.bind(this, true)}
      onMouseUp={setHold.bind(this, false)}
      onMouseLeave={setHold.bind(this, false)}
      className={clsx(
        'draggable-scroll-container',
        className,
        `axis-${axis}`,
        !disableScroll && 'has-scroll',
        isHold && 'is-hold'
      )}
    >
      {hasNavigation && !disableScroll && (
        <IconButton
          className="nav-btn nav-left-btn"
          onClick={handleNav.bind(this, false)}
        >
          {axis === 'y' ? <UpIcon /> : <LeftIcon />}
        </IconButton>
      )}

      <ScrollContainer
        className={clsx('draggable-sec', dragClass)}
        vertical={!disableScroll && (axis === 'Y' || axis === 'xy')}
        horizontal={!disableScroll && (axis === 'x' || axis === 'xy')}
        {...rest}
      >
        {children}
      </ScrollContainer>

      {hasNavigation && !disableScroll && (
        <IconButton
          className="nav-btn nav-right-btn"
          onClick={handleNav.bind(this, true)}
        >
          {axis === 'y' ? <DownIcon /> : <RIghtIcon />}
        </IconButton>
      )}
    </div>
  )
}

export default DraggableScroll
