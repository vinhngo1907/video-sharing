import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserDetails, type UserState } from '../types/user';

const userFormStorage = localStorage.getItem("user");

const initialState: UserState = {
    currentUser: userFormStorage ? JSON.parse(userFormStorage) : null,
    isLoggedIn: !userFormStorage,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleIsLoggedIn(state) {
            state.isLoggedIn = !state.isLoggedIn
        },
        setUser(state, action: PayloadAction<UserDetails>){
            state.currentUser = {...state.currentUser, ...action.payload}
            state.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(state.currentUser))
        }
    }
});

export const {toggleIsLoggedIn, setUser} = userSlice.actions;
export default userSlice.reducer;