import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import clsx from 'clsx'
import './style.scss'
import doller from '../../../assets/img/doller 2.svg'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'
import API, { URL } from '../../../Api'
import { setDream, setPageNo } from '../../../redux/Action'
import { useDispatch, useSelector } from 'react-redux'

const SelectDream = ({ label, imgUrl, cost, name, id, dreams, setDreams }) => {

    const dreamHandler = () => {
        setDreams({ id: id, dreamName: imgUrl, cost: cost })
    }
    const selected = dreams.id === id ? 'selected' : '';
    return (
        <div className="option-wrap" onClick={dreamHandler}>
            <div className="option-image" >
                <div className={`image-warp ${selected}`}>
                    <img style={{ height: '100px' }}
                        src={require(`../../../assets/img/${imgUrl}.svg`).default}
                        alt={label}
                    />
                    <div>
                        <img src={doller} alt={label} style={{ width: 20, height: 21, position: 'absolute' }} />
                        <span style={{
                            position: 'relative', fontSize: 18,
                            fontWeight: 'bold', color: ' #747d8c', marginLeft: 30
                        }}>{cost}</span>
                    </div>
                </div>
            </div>
            <div className="option-label">{label}</div>
        </div>
    )
}

const SelectCar = ({ label, imgUrl, cost, name, id, cars, setCars }) => {

    const carsHandler = () => {
        setCars({ id: id, carName: imgUrl, cost: cost })
    }
    const selected = cars.id === id ? 'selected' : ''

    return (
        <div className='option-wrap' onClick={carsHandler}>
            <div className="option-image">
                <div className={`image-warp ${selected}`}>
                    <img
                        src={require(`../../../assets/img/${imgUrl}.svg`).default}
                        alt={label}
                    />
                    <div style={{ marginTop: '10px', bottom: '5px' }}>
                        <img src={doller} alt={label} style={{ width: 20, height: 21, position: 'absolute', }} />
                        <span style={{
                            position: 'relative', fontSize: 18,
                            fontWeight: 'bold', color: ' #747d8c', marginLeft: 30
                        }}>{cost}</span>
                    </div>
                </div>
            </div>
            <div className="option-label">{label}</div>
        </div>
    )
}

const SelectHouse = ({ label, imgUrl, cost, name, id, houses, setHouses }) => {

    const houseHandler = () => {
        setHouses({ id: id, houseName: imgUrl, cost: cost })
    }
    const selected = houses.id === id ? 'selected' : ''
    return (
        <div className='option-wrap' onClick={houseHandler} >
            <div className="option-image">
                <div className={`image-warp ${selected}`}>
                    <img
                        src={require(`../../../assets/img/${imgUrl}.svg`).default}
                        alt={label}
                        style={{ width: 150, height: 100 }}
                    />
                    <div>
                        <img src={doller} style={{ width: 20, height: 21, position: 'absolute', }} />
                        <span style={{
                            position: 'relative', fontSize: 18,
                            fontWeight: 'bold', color: ' #747d8c', marginLeft: 30
                        }}>{cost}</span>
                    </div>
                </div>
            </div>
            <div className="option-label">{label}</div>
        </div>
    )
}

function SelectDreams() {

    const dreamsCollection = useSelector(state => state.dreams)
    console.log(dreamsCollection)

    const dispatch = useDispatch()

    const [dreams, setDreams] = useState(dreamsCollection.dream);
    const [cars, setCars] = useState(dreamsCollection.car);
    const [houses, setHouses] = useState(dreamsCollection.house);

    const restDream = { dreams, setDreams }
    const restCar = { cars, setCars }
    const restHouse = { houses, setHouses }

    const history = useHistory();

    const initialValues = {
        dream: dreams,
        car: cars,
        house: houses,
        pageNo: 3,
    }

    const token = localStorage.getItem('midasToken')
    const auth = 'Bearer '.concat(token)

    const goToDashboard = (initialValues) => {

        console.log(initialValues)
        dispatch(setDream(initialValues))

        API.post(URL.dreamSelection, initialValues, {
            headers: {
                Authorization: auth
            }
        })
            .then((res) => {
                console.log(res)
                dispatch(setPageNo(3))
                history.push(commonRoute.dashboard.mainDash)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const goToHome = () => {
        history.push(commonRoute.selectAvatar)
    }

    return (
        <Grid item xs={12} md={10} className="select-dreams-card">
            <div className="header-sec">
                <h3 className="main-head">Select House</h3>
            </div>
            <Grid
                container
                justify="space-around"
                alignContent="center"
                className="options-selector"
            >
                <SelectHouse
                    label="Studio Apartment"
                    imgUrl={`StudioApt`}
                    id={1}
                    name="studioApt"
                    cost={100000}
                    {...restHouse}
                />
                <SelectHouse
                    label="Fixer Upper"
                    imgUrl={`FixerUp`}
                    id={2}
                    name="fixerUp"
                    cost={170000}
                    {...restHouse}
                />
                <SelectHouse
                    label="Rambler"
                    imgUrl={'Rambler'}
                    id={3}
                    name="rambler"
                    cost={230000}
                    {...restHouse}
                />
                <SelectHouse
                    label="Mansion"
                    imgUrl={`Mansion`}
                    id={4}
                    name="mansion"
                    cost={310000}
                    {...restHouse}
                />
                <SelectHouse
                    label="Chateau"
                    imgUrl={'Chateau'}
                    id={5}
                    name="chateau"
                    cost={400000}
                    {...restHouse}
                />
            </Grid>
            <div className="header-sec">
                <h3 className="main-head">Select Car</h3>
            </div>
            <Grid
                container
                justify="space-around"
                alignContent="center"
                className="options-selector"
            >
                <SelectCar
                    label="Relisible Car"
                    imgUrl={`RelisibleCar`}
                    id={1}
                    name="relisibleCar"
                    cost={5000}
                    {...restCar}
                />
                <SelectCar
                    label="Economy Car"
                    imgUrl={`EconomyCar`}
                    id={2}
                    name="economyCar"
                    cost={12000}
                    {...restCar}
                />
                <SelectCar
                    label="Fully Loaded Car"
                    imgUrl={'FullLoadCar'}
                    id={3}
                    name="fullLoadedCar"
                    cost={20000}
                    {...restCar}
                />
                <SelectCar
                    label="Luxury Car"
                    imgUrl={'LuxuryCar'}
                    id={4}
                    name="luxuryCar"
                    cost={27000}
                    {...restCar}
                />
                <SelectCar
                    label="Speedster Car"
                    imgUrl={`SpeedsterCar`}
                    id={5}
                    name="speedsterCar"
                    cost={35000}
                    {...restCar}
                />
            </Grid>
            <div className="header-sec">
                <h3 className="main-head">Select Dream</h3>
            </div>
            <Grid
                container
                justify="space-around"
                alignContent="center"
                className="options-selector"
            >
                <SelectDream
                    label="Visit Taj Mahal"
                    imgUrl={`Traveller`}
                    id={1}
                    name="traveller"
                    cost={3000}
                    {...restDream}
                />
                <SelectDream
                    label="Travel To Abroad"
                    imgUrl={`Flight`}
                    id={2}
                    name="flight"
                    cost={6000}
                    {...restDream}
                />
                <SelectDream
                    label="Hill Station"
                    imgUrl={'HillStation'}
                    id={3}
                    name="hillStation"
                    cost={9000}
                    {...restDream}
                />
                <SelectDream
                    label="Visit Beach"
                    imgUrl={`Beach`}
                    id={4}
                    name="beach"
                    cost={12000}
                    {...restDream}
                />
                <SelectDream
                    label="Long Ride"
                    imgUrl={'BikeRide'}
                    id={5}
                    name="bikeRide"
                    cost={15000}
                    {...restDream}
                />
            </Grid>


            <div className="btn-wrap">
                <Button className="btn" onClick={goToHome}>Back</Button>
                <Button className="btn" onClick={() => goToDashboard(initialValues)}>Next</Button>
            </div>
        </Grid>
    )
}

export default SelectDreams