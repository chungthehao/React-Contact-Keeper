import axios from 'axios'

// Gắn token vô headers của axios (Ở đầu cần thì gọi hàm này, rồi request tới server)
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken