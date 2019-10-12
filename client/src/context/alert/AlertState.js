import React, { useReducer } from 'react'
import uuid from 'uuid'

import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = props => {

    const initialState = [] // alert object

    // * Pull out the state and dispatch from our reducer by using the use reducer hook
    const [state, dispatch] = useReducer(alertReducer, initialState)

    /* --- Actions --- */
    // Set alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid.v4()
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    // Muốn truyền các gì xuống khi gói toàn application thì khai báo trong object ở 'value'
    return (
        <AlertContext.Provider 
            value={{ 
                alerts: state, // entire array of alerts
                setAlert
            }}>
            { props.children }
        </AlertContext.Provider>
    )
}

export default AlertState