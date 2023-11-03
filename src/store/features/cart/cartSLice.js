import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, { getState, dispatch, rejectWithValue }) => {
    try {
        /* We can also get the current state here with getState()
           const state = getState();
           
           We can also dispatch other actions here with dispatch()
            dispatch(someAction()); Note: we would need to import the action first

              We can also reject the promise here with rejectWithValue()
                return rejectWithValue('some error message');
                the message would be passed down to the rejected action creator
                in this case [getCartItems.rejected] as action.payload
        */
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
        increase: (state, action) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
        },
        decrease: (state, action) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            });
        },
        calculateTotals: (state) => {
            let { total, amount } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, amount } = cartItem;
                    const itemTotal = price * amount;

                    cartTotal.total += itemTotal;
                    cartTotal.amount += amount;

                    return cartTotal;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );
            total = parseFloat(total.toFixed(2));

            state.total = total;
            state.amount = amount;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false;
            // Set static array incase of error
            state.cartItems = cartItems;
        },
    },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
