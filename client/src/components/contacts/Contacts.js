import React, { Fragment, useContext } from 'react'

import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
    // Initialize context
    const contactContext = useContext(ContactContext)
    // Pull state out with these destructuring
    const { contacts } = contactContext


    return (
        <Fragment>
            {contacts.map(
                contact => <ContactItem key={contact.id} contact={contact} />
            )}
        </Fragment>
    )
}

export default Contacts