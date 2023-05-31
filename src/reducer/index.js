import {combineReducers} from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
import cartReducer from '../slice/cartSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
})

export default rootReducer;