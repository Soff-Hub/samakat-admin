import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoginning: JSON.parse(localStorage.getItem('is_loginning')) || false,
    token: localStorage.getItem('admin') || ''
}

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            // state.token = action.payload?.token
            // localStorage.setItem('admin', action.payload?.token)

            localStorage.setItem('admin', 'fdsjghsdfjghsdfgbudiyfgs')
            localStorage.setItem('is_loginning', JSON.stringify(true))
            state.isLoginning = true
        },
        logoutSuccess: (state, action) => {
            localStorage.removeItem('admin')
            localStorage.removeItem('is_loginning')
        }
    }
})


export const { loginSuccess, logoutSuccess } = slice.actions;
export default slice.reducer