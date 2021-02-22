
const initialState = null;

const StudentsListReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_STUDENT_LIST':
            return state = action.payload
        case 'USER_LOGOUT':
            return state = initialState
        case 'SET_NEW_GAME':
            return state = initialState

        default: return state
    }
}

export default StudentsListReducer