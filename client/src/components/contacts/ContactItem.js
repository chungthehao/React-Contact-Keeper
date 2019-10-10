import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact : { id, name, email, phone, type } }) => {
    // Initialize
    const contactContext = useContext(ContactContext)
    // Pull out the action
    const { deleteContact } = contactContext

    const onDelete = () => {
        deleteContact(id)
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
                {' '}
                <span 
                    style={{ float: 'right' }} 
                    className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                        {type.charAt(0).toUpperCase() + type.substr(1)}
                </span>
            </h3>

            <ul className="list">
                {
                    email && // Nếu tồn tại email thì mới có <li></li> này
                    (<li>
                        <i className="fas fa-envelope-open"></i> {email}
                    </li>)
                }

                {
                    phone && // Nếu tồn tại phone thì mới có <li></li> này
                    (<li>
                        <i className="fas fa-phone"></i> {phone}
                    </li>)
                }
            </ul>

            <p>
                <button className="btn btn-sm btn-dark">Edit</button>
                <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem