

const initialState = [{
    eventName: '',
    eventCost: ''
}]

const EventsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_EVENTS_COST':
            return state = action.payload
        case 'USER_LOGOUT':
            return state = initialState
        case 'SET_NEW_GAME':
            return state = initialState

        default: return state
    }
}

export default EventsReducer