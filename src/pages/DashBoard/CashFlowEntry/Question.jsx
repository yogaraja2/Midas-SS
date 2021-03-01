import React from 'react'
import { TextField } from '@material-ui/core'

function Question({ data, values, setValues }) {

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="question-wrap">
      <p className="question">{data.question}</p>
      <div className="field-wrap">
        {data.fields.map((i, index) => (
          <TextField
            key={index}
            className="qus-field"
            label={i.label}
            name={i.name}
            value={values[i.name]}
            type="number"
            onChange={handleChange}
            disabled={!i.isEnable}
          />
        ))}
      </div>
    </div>
  )
}

export default Question
