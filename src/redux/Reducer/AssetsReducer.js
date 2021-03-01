
const initialState = {
    isSoldHouse: false,
    isSoldCar: false,
}

const AssetsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_IS_HOUSE_SOLD':
            return { ...state, isSoldHouse: action.payload }

        case 'SET_IS_CAR_SOLD':
            return { ...state, isSoldCar: action.payload }

        case 'SET_NEW_GAME':
            return state = initialState

        case 'USER_LOGOUT':
            return state = initialState

        default: return state;
    }
}

export default AssetsReducer;