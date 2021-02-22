
const initialState = null

const DebtApiReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_DEBT_DATA':
            return state = action.payload
        case 'USER_LOGOUT':
            return state = initialState

        default: return state
    }
}

export default DebtApiReducer