import axios from 'axios';
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
    APPLY_COUPON,
    DECREASE_ITEM_QTY,
    INCREASE_ITEM_QTY
} from './actionTypes';

// Fetch cart items
export const getCartItems = (filters = {}) => async (dispatch) => {
    dispatch({ type: CART_FETCH_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        let queryParams = new URLSearchParams(filters).toString();

        const response = await axios.get(`${API_URL}/cart/view-cart?${queryParams}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: CART_FETCH_SUCCESS,
                payload: response.data,
            });
        } else {
            dispatch({ type: CART_FETCH_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: CART_FETCH_FAILURE, payload: error });
    }
};

// Create new cart item
export const createCartItem = (cartData) => async (dispatch) => {
    dispatch({ type: CART_CREATION_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        const response = await axios.post(`${API_URL}/cart/add-to-cart`, cartData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: CART_CREATION_SUCCESS,
                payload: response.data,
            });
            alert('successfull');
        } else {
            dispatch({ type: CART_CREATION_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: CART_CREATION_FAILURE, payload: error });
    }
};

// Update cart item
export const updateCartItem = (id, cartData) => async (dispatch) => {
    dispatch({ type: CART_UPDATE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        const response = await axios.patch(`${API_URL}/cart/update-cart/${id}`, cartData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            dispatch({
                type: CART_UPDATE_SUCCESS,
                payload: response.data.cart,  // Adjust payload to match the updated response structure
            });
        } else {
            dispatch({ type: CART_UPDATE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: CART_UPDATE_FAILURE, payload: error });
    }
};

// Delete cart item
export const deleteCartItem = (id) => async (dispatch) => {
    dispatch({ type: CART_DELETE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        const response = await axios.delete(`${API_URL}/cart/delete-cart/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: CART_DELETE_SUCCESS,
                payload: id,
            });
        } else {
            dispatch({ type: CART_DELETE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: CART_DELETE_FAILURE, payload: error });
    }
};
export const cartReset = () => async (dispatch) => {
    dispatch({ type: CART_DELETE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        const response = await axios.delete(`${API_URL}/cart/delete-cart`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: CART_DELETE_SUCCESS,
                payload: [],  // Clear the cart items in the state
            });
        } else {
            dispatch({ type: CART_DELETE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: CART_DELETE_FAILURE, payload: error });
    }
};


export const coupon = (couponCode) => (dispatch) => {
    if (couponCode === "MASAI40") {
        dispatch({ type: APPLY_COUPON, payload: 40 });
    } else if (couponCode === "MASAI30") {
        dispatch({ type: APPLY_COUPON, payload: 30 });
    } else if (couponCode === "MASAI90") {
        dispatch({ type: APPLY_COUPON, payload: 90 });
    } else if (couponCode === "MASAI20") {
        dispatch({ type: APPLY_COUPON, payload: 20 });
    } else if (couponCode === "MASAI70") {
        dispatch({ type: APPLY_COUPON, payload: 70 });
    } else {
        dispatch({ type: APPLY_COUPON, payload: 0 });
    }
};