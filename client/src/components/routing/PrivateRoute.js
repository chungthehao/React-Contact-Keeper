import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({ component: Component, ...rest }) => { // rest là 1 object chứa các properties còn lại khác 'component'
    // Initialize & pull out
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading } = authContext

    return (
        <Route 
            { ...rest } 
            render={ 
                props => {
                    if (!loading && !isAuthenticated) { // Load xong rồi mà isAuthenticated là false
                        return <Redirect to="/login" />
                    } else {
                        return <Component { ...props } />
                    }
                } 
            } 
        />
    )
}

export default PrivateRoute