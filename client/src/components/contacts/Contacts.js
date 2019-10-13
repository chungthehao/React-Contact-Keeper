import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
            <TransitionGroup>
                {
                    filtered !== null 
                        ?   filtered.map(
                                contact => (
                                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                                        <ContactItem contact={contact} />
                                    </CSSTransition>
                                )
                            )
                        :   contacts.map(
                                contact => (
                                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                                        <ContactItem key={contact.id} contact={contact} />
                                    </CSSTransition>
                                )
                            )
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts