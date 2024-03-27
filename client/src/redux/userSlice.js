import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    currentUser: null,
    loading:false,
    error:false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
                state.loading = false;
                state.error = false;
        },
        subscription: (state,action) =>{
            if(state.currentUser.subscribedUsers.includes(action.payload)){
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload),1);
            }else{
                state.currentUser.subscribedUsers.push(action.payload);
            }
        },
        history: (state,action) => {
            state.currentUser.history.push(action.payload);
        },
        watchLater: (state,action) => {
            state.currentUser.watchLater.push(action.payload);
        },
        addTags: (state,action) => {
            state.currentUser.pTags.push(action.payload);
        },
        updateImg: (state,action) => {
            state.currentUser.img = action.payload;
        },
        updateBanner: (state,action) => {
            state.currentUser.banner = action.payload;
        },
        updateAbout: (state,action) => {
            state.currentUser.about = action.payload;
        },
    },
})

export const {loginStart, loginSuccess, loginFailure, logout, subscription, history, watchLater, addTags, updateImg, updateBanner, updateAbout} = userSlice.actions
export default userSlice.reducer;