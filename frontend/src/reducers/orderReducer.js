import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_RESET,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
    ORDER_PAY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,

    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    
    ORDER_UPDATE_ADMIN_REQUEST,
    ORDER_UPDATE_ADMIN_SUCCESS,
    ORDER_UPDATE_ADMIN_FAIL,
    ORDER_UPDATE_ADMIN_RESET,

    ORDER_DELETE_ADMIN_REQUEST,
    ORDER_DELETE_ADMIN_SUCCESS,
    ORDER_DELETE_ADMIN_FAIL,
} from '../constants/orderConst'

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { 
                loading: false, 
                order: action.payload,
                success: true
             }
        case ORDER_CREATE_FAIL:
            return { loading: false,
            error: action.payload }
        default:
            return state
    }
}

export const orderDetailsReducer = (
    state = { 
        loading:true, 
        orderItems: [], 
        shippingAddress: {} 
    }, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return { 
                ...state,
                loading: true 
            }
        case ORDER_DETAILS_SUCCESS:
            return { 
                loading: false, 
                order: action.payload,
             }
        case ORDER_DETAILS_FAIL:
            return { loading: false,
            error: action.payload }
        case ORDER_DETAILS_RESET:
            return {
                loading: true,
                orderItems: [], 
                shippingAddress: {} 
            }
        default:
            return state
    }
}

export const orderPayReducer = (
    state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return { 
                loading: true 
            }
        case ORDER_PAY_SUCCESS:
            return { 
                loading: false, 
                success: true,
             }
        case ORDER_PAY_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
         case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderListReducer = (
    state = { 
        orders:[] 
    }, action) => {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return { 
                loading: true 
            }
        case ORDER_LIST_SUCCESS:
            return { 
                loading: false, 
                orders: action.payload
             }
        case ORDER_LIST_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
        case ORDER_LIST_RESET:
            return { orders:[] }
        default:
            return state
    }
}

export const adminOrderListReducer = (
    state = { 
        orders:[] 
    }, action) => {
    switch(action.type){
        case ORDER_LIST_ADMIN_REQUEST:
            return { 
                loading: true 
            }
        case ORDER_LIST_ADMIN_SUCCESS:
            return { 
                loading: false, 
                orders: action.payload
             }
        case ORDER_LIST_ADMIN_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
        default:
            return state
    }
}

export const adminOrderUpdateReducer = (
    state = { 
    }, action) => {
    switch(action.type){
        case ORDER_UPDATE_ADMIN_REQUEST:
            return { 
                loading: true 
            }
        case ORDER_UPDATE_ADMIN_SUCCESS:
            return { 
                loading: false,
                success: true, 
             }
        case ORDER_UPDATE_ADMIN_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
        case ORDER_UPDATE_ADMIN_RESET:
            return {}
        default:
            return state
    }
}

export const adminOrderDeleteReducer = (
    state = {}, action) => {
    switch(action.type){
        case ORDER_DELETE_ADMIN_REQUEST:
            return { 
                loading: true 
            }
        case ORDER_DELETE_ADMIN_SUCCESS:
            return { 
                loading: false,
                success: true, 
             }
        case ORDER_DELETE_ADMIN_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
        default:
            return state
    }
}

