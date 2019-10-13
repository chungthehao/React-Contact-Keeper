import React, { useReducer } from 'react'
import axios from 'axios'

import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,
    UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_CONTACTS, CLEAR_FILTER, CONTACT_ERROR
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    }

    // * Pull out the state and dispatch from our reducer by using the use reducer hook
    const [state, dispatch] = useReducer(contactReducer, initialState)

    /* --- Actions --- */
    // Get contacts
    const getContacts = async () => {
        try {
            // jwt (x-auth-token) đã được set global ở App.js rồi
            const res = await axios.get('/api/contacts')

            dispatch({ type: GET_CONTACTS, payload: res.data })
        } catch (err) {
            console.error(err.response.data)
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg })
        }
    }

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
    const deleteContact = async contactId => {
        try {
            await axios.delete(`/api/contacts/${contactId}`)

            dispatch({ type: DELETE_CONTACT, payload: contactId })
        } catch (err) {
            console.error(err.response.data)
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg })
        }
    }

    // Update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)

            dispatch({ type: UPDATE_CONTACT, payload: res.data })
        } catch (err) {
            console.error(err.response.data)
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg })
        }
    }

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    
    // Clear contacts
    const clearContacts = () => dispatch({ type: CLEAR_CONTACTS })
    

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
                loading: state.loading,
                getContacts,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
                clearContacts
            }}>
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState