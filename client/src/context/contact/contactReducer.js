import {
    GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,
    UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, CLEAR_CONTACTS
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return { 
                ...state, // Trạng thái state cũ
                contacts: action.payload,
                loading: false
            }
        
        case ADD_CONTACT:
            return { 
                ...state, // Trạng thái state cũ
                contacts: [ // Ghi đè lên 'contacts' của 'state' cũ (ở trên)
                    action.payload, // cái mới add
                    ...state.contacts // những contacts cũ
                ],
                loading: false
            }
        
        case DELETE_CONTACT:
            return { 
                ...state, // Trạng thái state cũ
                contacts: state.contacts.filter(c => c._id !== action.payload),
                loading: false
            }

        case UPDATE_CONTACT:
            // Vấn đề performance: nếu mảng 1000 eles, chạy hết 1000 cái (dù cho đã đổi xong ở đâu đó r)
            return {
                ...state,
                contacts: state.contacts.map(c => c._id === action.payload._id ? action.payload : c),
                loading: false
            }

            // * Cách mình:
            // const idx = state.contacts.findIndex(c => c.id === action.payload.id)
            // state.contacts.splice(idx, 1, action.payload)
            // return { 
            //     ...state, // Trạng thái state cũ
            // }
        
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
        
        case FILTER_CONTACTS:
            return { 
                ...state, // Trạng thái state cũ
                filtered: state.contacts.filter(c => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return c.name.match(regex) || c.email.match(regex) || c.phone.match(regex) || c.type.match(regex)
                })
            }
        
        case CLEAR_CONTACTS:
            return { 
                ...state, // Trạng thái state cũ
                contacts: null,
                filtered: null,
                loading: true,
                error: null,
                current: null
            }
        
        case CLEAR_FILTER:
            return { 
                ...state, // Trạng thái state cũ
                filtered: null
            }
        
        case CONTACT_ERROR:
            return { 
                ...state, // Trạng thái state cũ
                error: action.payload
            }
        
        default:
            return state
    }
}