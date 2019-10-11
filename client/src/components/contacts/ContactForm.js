/**
 * useState: xài "local" component level
 * useContext: xài "global"
 * useEffect: mimic lifecycle hook 'component did mount' 
 */
import React, { useState, useContext, useEffect } from 'react'

import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    // Initialize context
    const contactContext = useContext(ContactContext) // Mang nó vô để add contact vô state

    const { current, clearCurrent, addContact, updateContact } = contactContext

    useEffect(() => {
        if (current !== null) {
            setContact(current)
        } else { // Khi clearCurrent lôi theo phần else này luôn
            // Clear the form ("local" component level)
            setContact({ name: '', email: '', phone: '', type: 'personal' })
        }
    }, [current, contactContext]) // Khi nào chạy? Khi những thằng trong mảng thay đổi!

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

        if (current === null) { // * Add new
            // Add data to state ("global")
            addContact(contact)
        } else { // * Update
            updateContact(contact)
        }

        clearAll()
    }

    const clearAll = () => {
        clearCurrent()

    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{ current ? 'Edit contact' : 'Add contact' }</h2>

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
                <input type="submit" className="btn btn-block btn-primary" value={ current ? 'Update contact' : 'Save contact' } />
            </div>

            {
                current &&
                (<div>
                    <button className="btn btn-block btn-light" onClick={clearAll}>Clear</button>
                </div>)
            }
        </form>
    )
}

export default ContactForm