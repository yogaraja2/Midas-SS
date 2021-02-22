import React from 'react'
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { MdVisibility, MdVisibilityOff, MdClose } from 'react-icons/md'
import './style.scss'

const Textfield = ({
  className,
  placeholder,
  label,
  value,
  name,
  type,
  onChange,
  setChange,
  prefix,
  suffix,
  clear,
  error,
  hasValidation,
  inputProps,
  defaultValue,
  ...rest
}) => {
  const [textType, setType] = React.useState(type || 'text')
  const labelStatus = !!label ? ' with-label' : ''
  const errorStatus = hasValidation ? ' with-error' : ''
  const disabledStatus = !!rest?.disabled ? ' is-disabled' : ''

  const handleClear = () => {
    !!onChange &&
      onChange({
        target: {
          name,
          value: ''
        }
      })

    !!setChange && setChange('')
  }

  const handleChange = (e) => {
    !!onChange && onChange(e)
    !!setChange && setChange(e.target.value)
  }

  const toggleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'))
  }

  const suffixElement = () => {
    if (clear && !suffix && !!value) {
      return (
        <InputAdornment position="end">
          <IconButton className="clr-btn" onClick={handleClear} edge="end">
            <MdClose />
          </IconButton>
        </InputAdornment>
      )
    } else if (!!suffix) {
      return <InputAdornment position="end">{suffix}</InputAdornment>
    } else if (!suffix && !!value && type?.toLowerCase() === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton className="pass-rvl-btn" onClick={toggleType} edge="end">
            {textType === 'text' ? <MdVisibility /> : <MdVisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    } else {
      return null
    }
  }

  return (
    <div
      className={'txt-field-wrap' + labelStatus + errorStatus + disabledStatus}
    >
      <FormControl
        className={'txt-field' + (!!className ? ` ${className}` : '')}
        variant="outlined"
        size="small"
      >
        {!!label && <div className="label">{label}</div>}
        <OutlinedInput
          className="txt-field-inp"
          placeholder={placeholder}
          value={value}
          name={name}
          type={textType}
          onChange={handleChange}
          inputProps={inputProps}
          defaultValue={defaultValue}
          startAdornment={
            !!prefix && (
              <InputAdornment position="start">{prefix}</InputAdornment>
            )
          }
          endAdornment={suffixElement()}
          {...rest}
        />
      </FormControl>
      {!!error && typeof error !== 'object' && (
        <label className="txt-field-error err-msg">{error}</label>
      )}
    </div>
  )
}

export default Textfield
