
const initialState = null

const InstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INSTRUCTORS':
            return state = action.payload
        case 'USER_LOGOUT':
            return state = initialState

        default: return state
    }
}

export default InstructorReducer