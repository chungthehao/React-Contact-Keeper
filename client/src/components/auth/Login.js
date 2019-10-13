import React, { useState, useContext, useEffect } from 'react'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = props => {
    // Initialize & pull out
    const authContext = useContext(AuthContext)
    const { error, isAuthenticated, login, clearErrors } = authContext

    // Initialize & pull out
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    // Component level state
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    // Pull these out
    const { email, password } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    useEffect(() => {
        if (error) {
            setAlert(error, 'danger')
            clearErrors()
        }

        if (isAuthenticated) {
            props.history.push('/') // redirect to home page after authenticated
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const onSubmit = e => {
        e.preventDefault()

        if (email.trim() === '' || password === '') {
            setAlert('Please fill in all fields.', 'danger')
        } else {
            login({ email, password })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login