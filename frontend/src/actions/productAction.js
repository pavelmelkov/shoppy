import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 

    PRODUCT_DELETE_ADMIN_REQUEST,
    PRODUCT_DELETE_ADMIN_SUCCESS,
    PRODUCT_DELETE_ADMIN_FAIL,

    PRODUCT_CREATE_ADMIN_REQUEST,
    PRODUCT_CREATE_ADMIN_SUCCESS,
    PRODUCT_CREATE_ADMIN_FAIL,
    
    PRODUCT_UPDATE_ADMIN_REQUEST,
    PRODUCT_UPDATE_ADMIN_SUCCESS,
    PRODUCT_UPDATE_ADMIN_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,
} from '../constants/productConst'

export const listProducts = (keyword = '', brand='', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        if (brand !== '') {
            const { data } = await axios.get(
                `/api/products?brand=${brand}`
                )
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: data
                })
        } else {
            const { data } = await axios.get(
                `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
                )
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: data
                })

        }

      
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})

        const { data } = await axios.get(
            `/api/products/top`
            )
            
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const deleteProductByAdmin = (id) => async (dispatch, getState) => {
    try {

        dispatch({type: PRODUCT_DELETE_ADMIN_REQUEST})

        const config = {
            headers: {
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_ADMIN_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const createProductByAdmin = () => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_ADMIN_REQUEST})

        const config = {
            headers: {
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const updateProductByAdmin = (product) => async (dispatch, getState) => {
    try {
        
        dispatch({type: PRODUCT_UPDATE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Content-Type':'application/json',
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const createReview = (productId, review) => async (dispatch, getState) => {
    try {
        
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST })
        
        const config = {
            headers: {
                'Content-Type':'application/json',
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const addCommentToReview = (productId, comment) => async (dispatch, getState) => {
    try {
        
        dispatch({type: PRODUCT_UPDATE_REVIEW_REQUEST })
        
        const config = {
            headers: {
                'Content-Type':'application/json',
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        await axios.put(`/api/products/${productId}/reviews`, comment, config)
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}