import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoginning: JSON.parse(localStorage.getItem('is_loginning')) || false,
    token: localStorage.getItem('admin') || '',
    user: null,
    currentPage: 'Dashboard'
}

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload?.token.access
            localStorage.setItem('admin', action.payload?.token.access)

            localStorage.setItem('admin', action.payload?.token.access)
            localStorage.setItem('is_loginning', JSON.stringify(true))
            state.isLoginning = true
        },
        logoutSuccess: (state, action) => {
            state.isLoginning = false
            state.token = ''
            localStorage.removeItem('admin')
            localStorage.removeItem('is_loginning')
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})


export const { loginSuccess, logoutSuccess, setUser, setCurrentPage } = slice.actions;
export default slice.reducer