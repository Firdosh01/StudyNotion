import {combineReducers} from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
import cartReducer from '../slice/cartSlice'
import courseReducer from '../slice/courseSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
})

export default rootReducer;