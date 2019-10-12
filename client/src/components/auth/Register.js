import React, { useState, useContext, useEffect } from 'react'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Register = () => {
    // Component level state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    // Pull these out
    const { name, email, password, password2 } = user

    // Initialize
    const alertContext = useContext(AlertContext)
    // Pull out
    const { setAlert } = alertContext

    // Initialize
    const authContext = useContext(AuthContext)
    // Pull out
    const { error, register, clearErrors } = authContext

    useEffect(() => {
        if (error === 'This email has been already registered.') {
            setAlert(error, 'danger')
            clearErrors()
        }
    }, [error])

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        if (name === '' || email === '' || password === '') {
            // AlertState.js: const setAlert = (msg, type, timeout = 5000) => {...
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Passwords do not match ', 'danger')
        } else {
            register({ name, email, password })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} minLength="6" />
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register