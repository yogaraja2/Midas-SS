
const initialState = null;

const CashflowApiReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_CASHFLOW_DATA':
            return state = action.payload
        case 'SET_NEW_GAME':
            return state = initialState
        case 'USER_LOGOUT':
            return state = initialState

        default: return state
    }
}

export default CashflowApiReducer