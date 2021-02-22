import React from 'react'
import clsx from 'clsx'
import './style.scss'

const TextArea = ({
  className,
  name,
  value,
  placeholder,
  inputRef,
  label,
  error,
  onChange,
  setChange,
  hasValidation,
  ...rest
}) => {
  const handleChange = (e) => {
    !!onChange && onChange(e)
    !!setChange && setChange(e?.target?.value)
  }

  return (
    <div
      className={clsx(
        'txt-area-wrap',
        className,
        !!hasValidation && 'with-error'
      )}
    >
      <div className="txt-area-label">{label}</div>
      <textarea
        className="txt-area"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        ref={inputRef}
        {...rest}
      />
      {!!error && <div className="err-msg">{error}</div>}
    </div>
  )
}

export default TextArea
