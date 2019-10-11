import React, { Fragment, useContext } from 'react'

import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
    // Initialize context
    const contactContext = useContext(ContactContext)
    // Pull state out with these destructuring
    const { contacts, filtered } = contactContext

    if (contacts.length === 0) return <h4>Please add your contacts.</h4>

    return (
        <Fragment>
            {
                filtered !== null 
                    ?   filtered.map(
                            contact => <ContactItem key={contact.id} contact={contact} />
                        )
                    :   contacts.map(
                            contact => <ContactItem key={contact.id} contact={contact} />
                        )
            }
        </Fragment>
    )
}

export default Contacts