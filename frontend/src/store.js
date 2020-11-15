import {
     createStore, combineReducers, applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { detailsPeducer } from './reducers/detailsReducer.js'
import { productListPeducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginPeducer } from './reducers/userReducer'
import { userRegisterPeducer } from './reducers/userReducer'
import { userDetailsReducer } from './reducers/userReducer'
import { userUpdateProfileReducer } from './reducers/userReducer'
import { orderCreateReducer } from './reducers/orderReducer'
import { orderDetailsReducer } from './reducers/orderReducer'
import { orderPayReducer } from './reducers/orderReducer'
import { orderListReducer } from './reducers/orderReducer'
import { userListReducer } from './reducers/userReducer'
import { deleteUserReducer } from './reducers/userReducer'
import { updateUserByAdminReducer } from './reducers/userReducer'

import { productDeletePeducer } from './reducers/productReducer'
import { productCreatePeducer, productTopListPeducer } from './reducers/productReducer'
import { productUpdatePeducer, productCreateReviewReducer, productUpdateReviewReducer } from './reducers/productReducer'

import { adminOrderListReducer, adminOrderUpdateReducer, adminOrderDeleteReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListPeducer,
    details: detailsPeducer,
    cartList: cartReducer,
    productReview: productCreateReviewReducer,
    productTop: productTopListPeducer,
    productReviewUpdate: productUpdateReviewReducer,

    userLogin: userLoginPeducer,
    userRegister: userRegisterPeducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    
    //admin
    deleteUser: deleteUserReducer,
    updateUserByAdmin: updateUserByAdminReducer, 
    deleteProduct: productDeletePeducer,
    productCreate: productCreatePeducer,
    updateProduct: productUpdatePeducer,
    orderAllList: adminOrderListReducer,
    orderUpdate: adminOrderUpdateReducer,
    orderDelete: adminOrderDeleteReducer,
}) // combine different reducers in one single

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? 
JSON.parse(localStorage.getItem('paymentMethod')) : null

const intitialState = {
    cartList: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
} // start with default store

const middleware = [thunk]

const store = createStore(
    reducer, 
    intitialState, 
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
) // create global store


export default store

