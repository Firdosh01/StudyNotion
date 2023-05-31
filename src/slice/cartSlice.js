import { createSlice } from '@reduxjs/toolkit'
import {toast} from "react-hot-toast"

const initialState = {
    totalItems: localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItems")) : 0
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
      setTotalItems(state, value) {
          state.token = value.payload;
      },
    //   add to Cart
    // removefromCart
    // resetCart
    },
  
  })
  
  export const {setTotalItems} = cartSlice.actions;
  export default cartSlice.reducer;