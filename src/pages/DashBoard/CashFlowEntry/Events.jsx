import React, { useState } from 'react'
import Textfield from '../../../components/Textfield'
import clsx from 'clsx'
import { TextField } from '@material-ui/core'


function Events({ eventName, eventCost, eventCollection }) {

    const handleChange = (e) => {

        // const { name, value } = e.target

        // setValues((prev) => ({
        //     ...prev,
        //     [name]: value
        // }))
    }

    return (
        <>
            <TextField
                className="eve-name-qus-field"
                label={"Event Name"}
                name={"eventName"}
                value={eventName}
                onChange={(e) => handleChange(e)}
            />
            <TextField
                className="eve-cost-qus-field"
                label={"Event Cost"}
                name={"eventCost"}
                value={eventCost}
                onChange={(e) => handleChange(e)}
            />
        </>
    )
}

export default Events
