const initialState = {
    dream: { id: 1, dreamName: 'Traveller', cost: 3000 },
    car: { id: 1, carName: 'RelisibleCar', cost: 5000 },
    house: { id: 1, houseName: 'StudioApt', cost: 100000 }
};

const DreamsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_DREAMS':
            return state = action.payload
        case 'SET_NEW_GAME':
            return state = initialState

        case 'USER_LOGOUT':
            return state = initialState

        default: return state
    }
}

export default DreamsReducer