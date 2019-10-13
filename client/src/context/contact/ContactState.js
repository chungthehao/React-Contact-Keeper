import React, { useReducer } from 'react'
import axios from 'axios'

import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,
    UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            /*
            {
                "id": 1,
                "name": "John Doe",
                "email": "john@doe.io",
                "phone": "888-888-8888",
                "type": "personal",
            },
            {
                "id": 2,
                "name": "Sara Watson",
                "email": "sara@watson.io",
                "phone": "222-222-2222",
                "type": "personal",
            },
            {
                "id": 3,
                "name": "Harry White",
                "email": "harry@white.io",
                "phone": "333-333-3333",
                "type": "professional",
            },
            */
        ],
        current: null,
        filtered: null,
        error: null
    }

    // * Pull out the state and dispatch from our reducer by using the use reducer hook
    const [state, dispatch] = useReducer(contactReducer, initialState)

    /* --- Actions --- */
    // Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            // jwt đã được set global ở App.js rồi
            const res = await axios.post('/api/contacts', contact, config)

            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (err) {
            console.error(err.response.data)
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg })
        }
    }

    // Delete contact
    const deleteContact = contactId => {
        dispatch({ type: DELETE_CONTACT, payload: contactId })
    }

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    // Filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    // Muốn truyền các gì xuống khi gói toàn application thì khai báo trong object ở 'value'
    return (
        <ContactContext.Provider 
            value={{ 
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter
            }}>
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState