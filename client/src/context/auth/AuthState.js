import React, { useReducer } from 'react'
import axios from 'axios'

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
import setAuthToken from  '../../utils/setAuthToken'

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
    const loadUser = async () => {
        // Load token into global headers
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth')
            dispatch({ type: USER_LOADED, payload: res.data })
        } catch (err) {
            console.error(err.response.data)
            dispatch({ type: AUTH_ERROR })
        }
    }

    // Register user (sign the user up & get a token back)
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.token
            })

            loadUser()
        } catch (err) {
            console.error(err.response.data.msg)
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Login user
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config)

            dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })

            loadUser()
        } catch (err) {
            if (err.response.data.errors) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response.data.errors[0].msg
                })
            } else if (err.response.data.msg) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response.data.msg
                })
            }
            console.error(err.response.data)
        }
    }

    // Logout user
    const logout = () => console.log('logout')

    // CLear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

    // Muốn truyền các gì xuống khi gói toàn application thì khai báo trong object ở 'value'
    return (
        <AuthContext.Provider 
            value={{ 
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState