import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_RESET
} from '../constants/cartConst'


export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find( x => x.product === item.product)
            if (existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map( x => x.product === existItem.product 
                    ? item : x ) 
                    // если объект с полем "продукт" уже существует в корзине, то заменяем тем же продуктом, 
                    // у которого могут быть другие параметры. Иначе выводим текущий итем.
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            const id = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter( (x) =>  x.product !== id )
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case CART_RESET:
            return {
                cartItems:[]
            }
        default:
            return state 
    }
}