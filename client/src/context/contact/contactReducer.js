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

        case UPDATE_CONTACT:
            // Vấn đề performance: nếu mảng 1000 eles, chạy hết 1000 cái (dù cho đã đổi xong ở đâu đó r)
            return {
                ...state,
                contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c)
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
        
        case CLEAR_FILTER:
            return { 
                ...state, // Trạng thái state cũ
                filtered: null
            }
        
        default:
            return state
    }
}