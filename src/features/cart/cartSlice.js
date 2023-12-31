import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: cartItems,
    amount: 10,
    total:0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) => {
      try {
        const resp = await axios(url);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state)=>{
            state.cartItems = [];
        },
        removeItem: (state, action)=>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=>item.id!==itemId);
        },
        increase: (state, {payload})=>{
            const cartItem = state.cartItems.find((item)=>item.id===payload)
            cartItem.amount++;
        },
        decrease: (state, {payload})=>{
            const cartItem = state.cartItems.find((item)=>item.id===payload)
            cartItem.amount--;
        },
        calTotal: (state)=>{
            let amount=0;
            let total = 0;
            state.cartItems.forEach((item)=>{
                amount+=item.amount;
                total+=item.amount*item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers:{
        [getCartItems.pending]: (state)=>{
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action)=>{
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state)=>{
            state.isLoading = false;
        }
    }
})

// console.log(cartSlice);
export const {clearCart,removeItem,increase,decrease,calTotal} = cartSlice.actions;
export default cartSlice.reducer;