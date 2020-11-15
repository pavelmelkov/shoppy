import axios from 'axios'

import { 
    CART_REMOVE_ITEM,
    CART_ADD_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConst' 

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            qty,
            price: data.product.price,
            countInStock: data.product.countInStock,
            image: data.product.image
        }
    })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cartList.cartItems))
 }

 export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id 
    })
    
    localStorage.removeItem('cartItems', JSON.stringify(getState().cartList.cartItems.find( x => x.product === id )))
 }

 export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data, 
    })
    
    localStorage.setItem('shippingAddress', 
        JSON.stringify(data))
 }

 export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data, 
    })
    
    localStorage.setItem('paymentMethod', 
        JSON.stringify(data))
 }
 

