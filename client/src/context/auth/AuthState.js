import React, { useReducer } from 'react'

import AuthContext from './authContext'
import authReducer from './authReducer'
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

const AuthState = props => {

    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true, // Để lúc đầu khỏi set từ false thành true, đợi response về r set 1 lần thôi
        error: null
    }

    // * Pull out the state and dispatch from our reducer by using the use reducer hook
    const [state, dispatch] = useReducer(authReducer, initialState)

    /* --- Actions --- */
    // Load user (lấy data của user đang login)


    // Register user (sign the user up & get a token back)


    // Login user


    // Logout user


    // CLear errors


    // Muốn truyền các gì xuống khi gói toàn application thì khai báo trong object ở 'value'
    return (
        <AuthContext.Provider 
            value={{ 
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error
            }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState