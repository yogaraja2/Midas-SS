
const initialState = null;

const StudentDetailReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_STUDENT_DETAIL':
            return state = action.payload
        case 'USER_LOGOUT':
            return state = initialState
        case 'SET_NEW_GAME':
            return state = initialState

        default: return state
    }
}

export default StudentDetailReducer