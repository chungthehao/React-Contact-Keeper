import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
    // Initialize context
    const contactContext = useContext(ContactContext)
    // Pull state out with these destructuring
    const { contacts, filtered, loading, getContacts } = contactContext

    useEffect(() => {
        getContacts()

        // eslint-disable-next-line
    }, []) // Just once when init

    if (loading === false && contacts.length === 0) return <h4>Please add your contacts.</h4>

    return (
        <Fragment>
            {
                (!loading && contacts !== null) // Load xong và tồn tại contacts
                    ?   (<TransitionGroup>
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
                        </TransitionGroup>)
                    :   <Spinner />
            }                
        </Fragment>
    )
}

export default Contacts