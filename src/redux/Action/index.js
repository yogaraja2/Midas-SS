export const setNewGame = () => {
    return {
        type: 'SET_NEW_GAME'
    }
}

export const setResponseData = (value) => {
    return {
        type: 'SET_RESPONSE',
        payload: value,
    }
}

export const setLoginData = (value) => {
    return {
        type: 'SET_LOGIN_DATA',
        payload: value,
    }
}

export const setPageNo = (value) => {
    return {
        type: 'SET_PAGE_NO',
        payload: value,
    }
}

export const setOrganizations = (value) => {
    return {
        type: 'SET_ORGANIZATIONS',
        payload: value
    }
}

export const setInstructors = (value) => {
    return {
        type: 'SET_INSTRUCTORS',
        payload: value
    }
}

export const setAvatarId = (value) => {
    return {
        type: 'SET_AVATAR_ID',
        payload: value,
    }
}

export const setDream = (value) => {
    return {
        type: 'SET_DREAMS',
        payload: value,
    }
}

export const setCurrentTurn = (value) => {
    return {
        type: 'SET_CURRENT_TURN',
        payload: value,
    }
}

export const setNetworth = (value) => {
    return {
        type: 'SET_NETWORTH',
        payload: value,
    }
}

export const setSurplusAmt = (value) => {
    return {
        type: 'SET_SURPLUS_AMT',
        payload: value,
    }
}

export const setSavingsAmt = (value) => {
    return {
        type: 'SET_SAVINGS_AMT',
        payload: value,
    }
}

export const setCashflowValues = (value) => {
    return {
        type: 'SET_CASHFLOW_VALUES',
        payload: value,
    }
}

export const setEventsCost = (value) => {
    return {
        type: 'SET_EVENTS_COST',
        payload: value,
    }
}

export const setEventCount = (value) => {
    return {
        type: 'SET_EVENT_COUNT',
        payload: value,
    }
}

export const setCashFlowApiData = (value) => {
    return {
        type: 'SET_CASHFLOW_DATA',
        payload: value,
    }
}

export const setBalanceApiData = (value) => {
    return {
        type: 'SET_BALANCE_DATA',
        payload: value,
    }
}

export const setDebtApiData = (value) => {
    return {
        type: 'SET_DEBT_DATA',
        payload: value,
    }
}

export const setStudentList = (value) => {
    return {
        type: 'SET_STUDENT_LIST',
        payload: value,
    }
}

export const setStudentDetail = (value) => {
    return {
        type: 'SET_STUDENT_DETAIL',
        payload: value,
    }
}

export const setIsHouseSold = (value) => {
    return {
        type: 'SET_IS_HOUSE_SOLD',
        payload: value,
    }
}

export const setIsCarSold = (value) => {
    return {
        type: 'SET_IS_CAR_SOLD',
        payload: value,
    }
}

export const setSoldHouse = (value) => {
    return {
        type: 'SET_SOLD_HOUSE',
        payload: value,
    }
}

export const setSoldCar = (value) => {
    return {
        type: 'SET_SOLD_CAR',
        payload: value,
    }
}





export const userLogout = () => {
    return {
        type: 'USER_LOGOUT'
    }
}