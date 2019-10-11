import React, { useContext, useRef, useEffect } from 'react'

import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    // Initialize
    const contactContext = useContext(ContactContext)
    // Pull out
    const { filtered, filterContacts, clearFilter } = contactContext

    // Initialize ref value
    const text = useRef('') // nothing by default

    const onChange = e => {
        // text.current.value : Give us actual value of the input
        if (text.current.value !== '') {
            console.log(text.current.value, e.target.value)
            filterContacts(e.target.value)
        } else {
            clearFilter()
        }
    }

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
    }, [filtered])

    return (
        <form>
            <input type="text" ref={text} onChange={onChange} placeholder="Filter contacts..." />
        </form>
    )
}

export default ContactFilter