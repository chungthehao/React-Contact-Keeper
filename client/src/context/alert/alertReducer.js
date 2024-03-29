import { SET_ALERT, REMOVE_ALERT } from '../types'

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state /* Những alerts cũ */, action.payload /* alert mới */]
        case REMOVE_ALERT:
            return state.filter(a => a.id !== action.payload)
        default:
            return state
    }
}