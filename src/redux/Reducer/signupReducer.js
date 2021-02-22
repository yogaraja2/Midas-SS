
// const initialState = {
//     responseData: null,
// }

const signupReducer = (state = null, action) => {

    switch (action.type) {

        case 'SET_RESPONSE':
            return state = action.payload

        case 'USER_LOGOUT':
            return state = null

        default: return state
    }
}

export default signupReducer