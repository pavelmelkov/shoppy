import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_RESET,

    PRODUCT_DELETE_ADMIN_REQUEST,
    PRODUCT_DELETE_ADMIN_SUCCESS,
    PRODUCT_DELETE_ADMIN_FAIL,

    PRODUCT_CREATE_ADMIN_REQUEST,
    PRODUCT_CREATE_ADMIN_SUCCESS,
    PRODUCT_CREATE_ADMIN_FAIL,
    PRODUCT_CREATE_ADMIN_RESET,
    PRODUCT_UPDATE_ADMIN_REQUEST,
    PRODUCT_UPDATE_ADMIN_SUCCESS,
    PRODUCT_UPDATE_ADMIN_FAIL,
    PRODUCT_UPDATE_ADMIN_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,

    PRODUCT_UPDATE_REVIEW_FAIL,
    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_RESET,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
} from '../constants/productConst'

export const productListPeducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, 
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            } 
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_LIST_RESET:
            return { products:[] }
        default:
            return state
    }
}

export const productDeletePeducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_ADMIN_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_ADMIN_SUCCESS:
            return { loading: false, success: true } 
        case PRODUCT_DELETE_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreatePeducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_ADMIN_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_ADMIN_SUCCESS:
            return { loading: false, success: true, product: action.payload } 
        case PRODUCT_CREATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_ADMIN_RESET:
            return { }
        default:
            return state
    }
}

export const productUpdatePeducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_ADMIN_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_ADMIN_SUCCESS:
            return { loading: false, success: true, product: action.payload } 
        case PRODUCT_UPDATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_ADMIN_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true } 
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_REVIEW_SUCCESS:
            return { loading: false, success: true } 
        case PRODUCT_UPDATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}


export const productTopListPeducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_TOP_SUCCESS:
            return { 
                     loading: false, 
                     products: action.payload,
                    } 
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}