
const initialState = 0;

const PageNoReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_PAGE_NO':
            return state = action.payload;

        case 'USER_LOGOUT':
            return state = initialState

        default: return state;
    }
}

export default PageNoReducer