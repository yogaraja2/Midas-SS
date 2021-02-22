import React from 'react'
import { Controller } from 'react-hook-form'
import Textfield from '../Textfield'
import Select from '../Select'
import TextArea from '../TextArea'
import DatePicker from '../DatePicker'
import { Checkbox } from '@material-ui/core'

export const FormDropdown = ({
  name,
  control,
  label,
  list,
  placeholder,
  inputProps,
  error,
  value,
  valueId,
  onChange: customChange,
  hasValidation,
  defaultValue,
  rules,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, value, onBlur }) => (
        <Select
          label={label}
          list={list}
          value={value}
          valueId={valueId}
          onChange={(e) => {
            onChange(e.target.value)
            !!customChange && customChange(e)
          }}
          placeholder={placeholder}
          inputProps={inputProps}
          error={error[name] && error[name]?.message}
          hasValidation={hasValidation}
          onBlur={onBlur}
          fullWidth
          {...rest}
        />
      )}
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}

export const FormTextfield = ({
  name,
  label,
  placeholder,
  rules,
  inputProps,
  control,
  error,
  hasValidation,
  defaultValue,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      as={
        <Textfield
          name={name}
          label={label}
          placeholder={placeholder}
          inputProps={inputProps}
          error={error && error[name] && error[name]?.message}
          hasValidation={hasValidation}
          {...rest}
        />
      }
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}

export const FormTextArea = ({
  name,
  label,
  list,
  placeholder,
  inputProps,
  error,
  hasValidation,
  defaultValue,
  rules,
  control,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      as={
        <TextArea
          name={name}
          label={label}
          placeholder={placeholder}
          inputProps={inputProps}
          error={error[name] && error[name]?.message}
          hasValidation={hasValidation}
          {...rest}
        />
      }
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}

export const FormDatePicker = ({
  name,
  label,
  control,
  error,
  placeholder,
  defaultValue,
  rules,
  disableFuture,
  clearable,
  ...rest
}) => {
  return (
    <div className="form-date-picker">
      <div className="label">{label}</div>
      <Controller
        render={({ onChange, value, name, onBlur }) => (
          <DatePicker
            placeholder={placeholder}
            name={name}
            onSelected={onChange}
            value={value}
            onBlur={onBlur}
            clearable={clearable}
            disableFuture={disableFuture}
            {...rest}
          />
        )}
        name={name}
        rules={rules}
        control={control}
        defaultValue={defaultValue}
      />
      <div className="error-msg">{error[name] && error[name]?.message}</div>
    </div>
  )
}

export const FormCheckBox = ({
  name,
  label,
  control,
  error,
  defaultValue,
  rules,
  text,
  ...rest
}) => {
  return (
    <div className="form-checkbox-wrap">
      {label && <div className="label">{label}</div>}
      <Controller
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        control={control}
        render={({ value, onChange, name, onBlur }) => (
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onClick={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            {...rest}
          />
        )}
      />
      <span className="check-box-text">{text}</span>
      <div className="err-msg">{error && error[name] && error[name]?.message}</div>
    </div>
  )
}
