import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

export default (state, { type, payload }) => {
    switch (type) {
        case REGISTER_SUCCESS:
            // Put the token inside of localStorage
            localStorage.setItem('token', payload)
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false
            }
        
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload // AuthState.js: err.response.data.msg
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}