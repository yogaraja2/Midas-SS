
const initialState = null

const OrganizationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_ORGANIZATIONS':
            return state = action.payload;
        case 'USER_LOGOUT':
            return state = initialState

        default: return state
    }
}

export default OrganizationReducer