import { coupon } from './action';
import {
    CART_FETCH_REQUEST,
    CART_FETCH_SUCCESS,
    CART_FETCH_FAILURE,
    CART_CREATION_REQUEST,
    CART_CREATION_SUCCESS,
    CART_CREATION_FAILURE,
    CART_UPDATE_REQUEST,
    CART_UPDATE_SUCCESS,
    CART_UPDATE_FAILURE,
    CART_DELETE_REQUEST,
    CART_DELETE_SUCCESS,
    CART_DELETE_FAILURE,
    INCREASE_ITEM_QTY,
    DECREASE_ITEM_QTY,
    APPLY_COUPON,
} from './actionTypes';

const initialState = {
    isLoading: false,
    error: null,
    cartItems: [],
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    coupon: 0
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_FETCH_REQUEST:
        case CART_CREATION_REQUEST:
        case CART_UPDATE_REQUEST:
        case CART_DELETE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CART_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: action.payload
            };

        case CART_CREATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: [...state.cartItems, action.payload],
            };

        case CART_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };

        case CART_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.filter((item) => item._id !== action.payload),
            };

    

        case APPLY_COUPON:
            return {
                ...state,
                coupon: action.payload
            };

        case CART_FETCH_FAILURE:
        case CART_CREATION_FAILURE:
        case CART_UPDATE_FAILURE:
        case CART_DELETE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
