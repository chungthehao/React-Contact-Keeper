import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
    const { id, name, email, phone, type } = contact

    // Initialize
    const contactContext = useContext(ContactContext)
    // Pull out the action
    const { deleteContact, setCurrent, clearCurrent } = contactContext

    const onDelete = () => {
        deleteContact(id)
        
        // Đang edit giữa chừng mà xóa (bất kỳ cái nào) thì dẹp việc edit đi
        clearCurrent()
    }

    const onEdit = () => {
        setCurrent(contact)
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
                <button className="btn btn-sm btn-dark" onClick={onEdit}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem