import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './style.scss'
import UploadBtn from '../../../components/UploadButton'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import { API } from '../../../config/apis'
import Fetch, { URL } from '../../../Api'
import { setNewGame, setPageNo, setAvatarId } from '../../../redux/Action'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'
import Textfield from '../../../components/Textfield'

function UserProfile() {

    const gameDetails = useSelector(state => state.selectAvatar)

    const dispatch = useDispatch();
    const history = useHistory();

    const [gameLength, setGameLength] = useState(gameDetails.gameLength)

    // useEffect(() => {
    // }, [gameDetails])

    const SelectLength = ({ id, name, gameLength, setGameLength }) => {
        return (
            <div className={clsx("len-fld", gameLength === id && 'selected')} onClick={setGameLength.bind(this, id)}>
                {name}
            </div>
        )
    }
    const other = { gameLength, setGameLength }

    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: ''
    })
    // console.log(newPassword)
    const [openPwd, setOpenPwd] = useState(false)
    const handleOpenPwd = () => {
        setOpenPwd(true)
    }
    const handleClose = () => {
        setOpenPwd(false)
    }


    const [openAvatar, setOpenAvatar] = useState(false)
    const handleOpenAvatar = () => {
        setOpenAvatar(true)
    }
    const closeAvatar = () => {
        setOpenAvatar(false)
    }

    const [avatar, setAvatar] = useState(gameDetails.avatarIcon)
    const restAvatar = { avatar, setAvatar }

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('midasToken')}`
    };

    useEffect(() => {
        const newData = {
            avatarIcon: avatar,
            income: gameDetails.income,
            gameLength: gameLength,
            role: gameDetails.role
        }
        dispatch(setAvatarId(newData))
        // console.log(newData)
        // let values = Object.assign({ pageNo: 2 }, newData);

        Fetch.post(URL.gameDetails, newData, { headers })
            .then((res) => {
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err.message)
            })

    }, [avatar, gameLength])

    const AvatarField = ({ id, avatar, setAvatar }) => {
        const handleAvatar = () => {
            setAvatar(id)
        }
        return (
            <div className={clsx("avatar", avatar === id && "selected")} onClick={handleAvatar}>
                <div className="img-wrap" >
                    <img src={require(`../../../assets/img/Avatar${id}.svg`).default} />
                </div>
            </div>
        )
    }

    const goToNewGame = () => {

        Fetch.get(API.gamePlay.cashFlow.newGame, { headers })
            .then(res => {
                // console.log(res.data)
                if (res.status === 200) {
                    dispatch(setNewGame())
                    dispatch(setPageNo(0))
                    history.push(commonRoute.gameOptions)
                }
            })
            .catch(err => {
                // console.log(err.message)
            })
    }



    return (
        <Grid item xs={12} md={10} className="user-profile-root">
            <Grid item xs={12} className="select-wrap-card">
                <Grid container className="select-wrap">
                    <h2 className="title">Avatar</h2>
                    <div className="btn-wrap" onClick={handleOpenAvatar}>
                        <div className={clsx("avatar-chg-btn", openAvatar && "selected")} >Change</div>
                    </div>
                    {/* <UploadBtn
                    label="Change"
                    variant="outlined"
                    component="span"  //for file uploading
                /> */}
                </Grid>
                <Grid container className="select-wrap">
                    <h2 className="title">Game Length</h2>
                    <div className="btn-wrap">
                        <SelectLength
                            id={10}
                            name="Short"
                            {...other}
                        />
                        <SelectLength
                            id={20}
                            name="Medium"
                            {...other}
                        />
                        <SelectLength
                            id={40}
                            name="Long"
                            {...other}
                        />
                    </div>
                </Grid>
                <Grid container className="select-wrap">
                    <h2 className="title">Password</h2>
                    <div className="btn-wrap" onClick={handleOpenPwd}>
                        <div className={clsx("pwd-chg-btn", openPwd && "selected")}>Change</div>
                    </div>
                </Grid>
            </Grid>

            <div className="nav-btn-wrap">
                <Button className="new-btn" onClick={goToNewGame}>New Game</Button>
                <Button className="quit-btn" onClick={goToNewGame}>Quit Game</Button>
            </div>

            {openPwd && (
                <Dialog open={openPwd} onClose={handleClose} aria-labelledby="update-password">
                    <DialogTitle id="update-password">Update Password</DialogTitle>
                    <DialogContent className="password-fields-wrap">
                        {/* <TextField
                            label="Old Password"
                            name="oldPassword"
                            id="oldPassword"
                            fullWidth
                        /> */}
                        <TextField
                            label="Enter New Password"
                            name="newPassword"
                            id="newPassword"
                            type="password"
                            helperText="alphanumeric with minimum length is 8"
                            value={newPassword.password}
                            onChange={e => (setNewPassword({ ...newPassword, password: e.target.value }))}
                            fullWidth
                        />
                        {/* <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            value={newPassword.confirmPassword}
                            onChange={e => (setNewPassword({ ...newPassword, confirmPassword: e.target.value }))}
                            fullWidth
                        /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {openAvatar && (
                <Dialog open={openAvatar} onClose={closeAvatar} aria-labelledby="update-avatar" className="update-avatar">
                    <DialogTitle id="update-avatar">Choose Avatar</DialogTitle>
                    <DialogContent className="avatars-wrap" >
                        <AvatarField
                            id={1}
                            {...restAvatar}
                        />
                        <AvatarField
                            id={2}
                            {...restAvatar}
                        />
                        <AvatarField
                            id={3}
                            {...restAvatar}
                        />
                        <AvatarField
                            id={4}
                            {...restAvatar}
                        />
                        <AvatarField
                            id={5}
                            {...restAvatar}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeAvatar} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            )
            }

        </Grid >
    )
}

export default UserProfile
