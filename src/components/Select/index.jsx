import React, { useState } from 'react'
import clsx from 'clsx'
import { Select as Dropdown, MenuItem, FormControl } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md'
import './style.scss'

const Select = ({
  className,
  placeholder,
  label,
  value,
  name,
  list,
  setChange,
  onChange,
  error,
  hasValidation,
  inputProps,
  popupClassName,
  display,
  multiple,
  valueId,
  hasNone,
  fullWidth,
  disabled,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(false)
  const currentValue = !multiple
    ? !!value || value === 0
      ? value
      : ' '
    : value?.length
    ? value
    : [' ']
  const showValue = !!display ? display : 'value'
  const sentValue = !!valueId ? valueId : 'id'
  const selectClass = clsx('select-field', !!className && className, {
    'with-error': !!hasValidation,
    'show-placeholder': currentValue === ' ',
    'has-full-width': !!fullWidth,
    'is-multiple': !!multiple
  })
  const placeholderClass = clsx('sel-placeholder', !hasNone && 'hide')

  const handleChange = (e) => {
    let { value, name } = e?.target
    if (multiple) {
      const dummayVarIndex = value.indexOf(' ')
      if (dummayVarIndex > -1) {
        value.splice(dummayVarIndex, 1)
      }
    } else {
      value = value === ' ' ? '' : value
    }
    !!setChange && setChange(value)
    !!onChange &&
      onChange({
        target: { name, value }
      })
  }

  const isDisabled = disabled || list?.length === 0 || !list

  return (
    <FormControl size="small" className={selectClass}>
      {!!label && <div className="label">{label}</div>}
      <Dropdown
        className={clsx("dropdown-box", isDisabled && 'is-disabled')}
        value={currentValue}
        name={name}
        onChange={handleChange}
        IconComponent={MdExpandMore}
        variant="outlined"
        inputProps={inputProps}
        multiple={multiple}
        onOpen={setOpen.bind(this, true)}
        onClose={setOpen.bind(this, false)}
        disabled={isDisabled}
        MenuProps={{
          className: popupClassName,
          variant: 'menu'
        }}
        {...rest}
      >
        <MenuItem value=" " disabled={!hasNone} className={placeholderClass}>
          {isOpen ? 'None' : placeholder}
        </MenuItem>
        {list?.length > 0 &&
          list?.map((i, index) => (
            <MenuItem key={index} value={i[sentValue]}>
              {i[showValue]}
            </MenuItem>
          ))}
      </Dropdown>
      {!!error && <div className="err-msg">{error}</div>}
    </FormControl>
  )
}

export default Select
