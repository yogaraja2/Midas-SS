
const initialState = {
    currentTurn: 0,
    netWorth: 0,
    surplusAmt: 0,
    savingsAmt: 0
}

const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_CURRENT_TURN':
            return { ...state, currentTurn: action.payload }

        case 'SET_NETWORTH':
            return { ...state, netWorth: action.payload }

        case 'SET_SURPLUS_AMT':
            return { ...state, surplusAmt: action.payload }

        case 'SET_SAVINGS_AMT':
            return { ...state, savingsAmt: action.payload }

        case 'SET_NEW_GAME':
            return state = initialState

        case 'USER_LOGOUT':
            return state = initialState

        default: return state

    }
}

export default dashboardReducer

