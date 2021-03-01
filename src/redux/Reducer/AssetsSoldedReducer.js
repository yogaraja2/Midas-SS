
const initialState = {
    soldCarName: '',
    soldHouseName: '',
}

const AssetsSoldedReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_SOLD_HOUSE':
            return { ...state, soldHouseName: action.payload };

        case 'SET_SOLD_CAR':
            return { ...state, soldCarName: action.payload };

        case 'SET_NEW_GAME':
            return state = initialState

        case 'USER_LOGOUT':
            return state = initialState

        default: return state;
    }
}

export default AssetsSoldedReducer;