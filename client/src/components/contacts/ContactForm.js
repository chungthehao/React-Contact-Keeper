import React, { useState, useContext } from 'react'

import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    // Initialize context
    const contactContext = useContext(ContactContext) // Mang nó vô để add contact vô state

    // Component level state
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })
    const { name, email, phone, type } = contact

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        // Add data to state
        contactContext.addContact(contact)

        // Clear the form
        setContact({ name: '', email: '', phone: '', type: 'personal' }) 
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add contact</h2>

            <input 
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={onChange}
            />

            <input 
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChange}
            />

            <input 
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone"
                onChange={onChange}
            />

            <h5>Contact type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal
            {' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional

            <div>
                <input type="submit" className="btn btn-block btn-primary" value="Add contact" />
            </div>
        </form>
    )
}

export default ContactForm