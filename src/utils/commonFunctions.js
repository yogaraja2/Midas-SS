export const phoneNoFmt = (number) => {
  const pattern = ('' + number).replace(/[^\d]/g, '')
  if (pattern.length === 10) {
    return pattern.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  } else if (pattern.length === 11) {
    return pattern.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
  }
  return number
}

export const moneyFmt = (number) => {
  const format = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(number))

  return (!!number || number === 0) ? format : `$0.00`
}

export const floatFmt = (number) => {
  const format = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(number))

  return (!!number || number === 0) ? format.replace('$', '') : `0.00`
}

export const numberFmt = (number) => {
  return Intl.NumberFormat('en-US').format(parseFloat(number))
}

export const onlyInt = (str, isNumber) => {
  const filter = ('' + str).replace(/[^\d]/g, '')

  if(isNumber) {
    return parseFloat(filter)
  }

  return filter
}

export const commonDateFmt = (date) => {
  const moment = require('moment')
  return !!date ? moment(new Date(date), 'YYYY-MM-DD').format('MMMM DD, YYYY') : ''
}

export const isPastDue = (date) => {
  return !!date && new Date().setHours(0, 0, 0, 0) > new Date(date)
}

export const getOriginPath = (path) => {
  const n = path?.indexOf(':')
  return path?.substring(0, n !== -1 ? n - 1 : path?.length)
}

export const softLoader = (value, fn) => {
  return value !== undefined || !isNaN(value)
    ? !!fn
      ? fn(value)
      : value
    : '...'
}

export const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const isStringEQ = (str1, str2) => {
  return str1?.toLowerCase() === str2?.toLowerCase()
}


export const toTop = () => {
  const ele = document.querySelector('.layout-wrapper-home')
  !!ele && ele.scrollTo(0, 0)
}