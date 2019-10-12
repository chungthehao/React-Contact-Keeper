import React, { useContext, useEffect } from 'react'

import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
    // Initialize & pull out
    const authContext = useContext(AuthContext)
    const { loadUser } = authContext

    useEffect(() => {
        loadUser() // Load user info 

        // Remove complain about dependencies
        // eslint-disable-next-line
    }, []) // Only want this to run when the component loads

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>

            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home