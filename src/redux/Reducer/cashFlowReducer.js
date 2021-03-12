const initialState = {
    livingExpenses: 0,
    entertainment: 0,
    retirementSavings: 0,
    creditCard: 0,
    carLoan: 0,
    studentLoan: 0,
    mortgage: 0,
    personalLoan: 0
}

const cashFlowReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_CASHFLOW_VALUES':
            return {
                ...state,
                livingExpenses: action.payload.livingExpenses,
                entertainment: action.payload.entertainment,
                retirementSavings: action.payload.retirementSavings,
                creditCard: action.payload.creditCard,
                carLoan: action.payload.carLoan,
                studentLoan: action.payload.studentLoan,
                mortgage: action.payload.mortgage,
                personalLoan: action.payload.personalLoan
            }

        case 'SET_NEW_GAME':
            return state = initialState

        case 'USER_LOGOUT':
            return state = initialState

        default: return initialState
    }
}

export default cashFlowReducer