import axios from 'axios'
import { CART_RESET } from '../constants/cartConst'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,

    ORDER_DELETE_ADMIN_REQUEST,
    ORDER_DELETE_ADMIN_SUCCESS,
    ORDER_DELETE_ADMIN_FAIL,

    ORDER_UPDATE_ADMIN_REQUEST,
    ORDER_UPDATE_ADMIN_SUCCESS,
    ORDER_UPDATE_ADMIN_FAIL,

} from '../constants/orderConst'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
    
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }

 export const getOrderById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }

 export const orderPay = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        localStorage.removeItem('cartItems')
        dispatch({
            type: CART_RESET
        })
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }

 export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }

 export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_ADMIN_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDER_LIST_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }

 export const updateOrderByAdmin = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_UPDATE_ADMIN_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: ORDER_UPDATE_ADMIN_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }

 export const deleteOrderByAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELETE_ADMIN_REQUEST
        })
    
        const token = getState().userLogin.userInfo.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.delete(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DELETE_ADMIN_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELETE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
 }