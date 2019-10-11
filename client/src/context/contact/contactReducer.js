import {
    ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,
    UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return { 
                ...state, // Trạng thái state cũ
                contacts: [ // Ghi đè lên 'contacts' của cái cũ
                    ...state.contacts, // những contacts cũ
                    action.payload // cái mới add
                ]
            }
        
        case DELETE_CONTACT:
            return { 
                ...state, // Trạng thái state cũ
                contacts: state.contacts.filter(c => c.id !== action.payload)
            }
        
        case SET_CURRENT:
            return { 
                ...state, // Trạng thái state cũ
                current: action.payload
            }
        
        case CLEAR_CURRENT:
            return { 
                ...state, // Trạng thái state cũ
                current: null
            }
        
        default:
            return state
    }
}