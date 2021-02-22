import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    uploadBtn: {
        border: '2px solid #009FFD',
        borderRadius: '50px',
        width: '90px', height: '35px',
        marginRight: '10px',
        color: '#009FFD',
        fontWeight: '700',
        textTransform: 'none'
    },
    input: {
        display: 'none',
    },
}))

function UploadButton(props) {
    const { label, variant, color, component, size, onClick, ...other } = props
    const classes = useStyles()

    return (
        <div>
            <input
                accept="image/*"
                className={classes.input}
                id="uploadBtn"
                multiple
                type="file"
            />
            <label htmlFor="uploadBtn">
                <Button
                    className={classes.uploadBtn}
                    variant={variant}
                    onClick={onClick}
                    component={component} // span for choose file
                    {...other}
                >{label}</Button>
            </label>
        </div>
    )
}

export default UploadButton
