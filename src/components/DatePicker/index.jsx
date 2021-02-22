import React from 'react'
import {
  DatePicker as MatDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { TextField, InputAdornment } from '@material-ui/core'
import { FaRegCalendarAlt } from 'react-icons/fa'
import './style.scss'

const DatePicker = ({
  value,
  name,
  className,
  placeholder,
  onChange,
  onSelected,
  disableFuture,
  clearable
}) => {
  const renderInput = (props) => (
    <TextField
      {...props}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaRegCalendarAlt />
          </InputAdornment>
        )
      }}
    />
  )

  const handleChange = (value) => {
    !!onChange &&
      onChange({
        target: { name, value }
      })
    !!onSelected && onSelected(value)
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MatDatePicker
        className={'date-picker-field' + (className ? ` ${className}` : '')}
        autoOk
        disableToolbar
        disableFuture={disableFuture}
        clearable={clearable}
        variant="inline"
        inputVariant="outlined"
        size="small"
        format="MM/DD/yyyy"
        TextFieldComponent={renderInput}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
