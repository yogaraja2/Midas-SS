
const initialState = null

const LoginReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_LOGIN_DATA':
            return state = action.payload;
        case 'USER_LOGOUT':
            return state = initialState

        default: return state
    }
}

export default LoginReducer