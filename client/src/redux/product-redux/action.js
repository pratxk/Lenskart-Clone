
import axios from 'axios';
import { PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_FAILURE, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILURE, PRODUCT_CREATION_REQUEST, PRODUCT_CREATION_SUCCESS, PRODUCT_CREATION_FAILURE, PRODUCT_SINGLE_FETCH_REQUEST, PRODUCT_SINGLE_FETCH_SUCCESS, PRODUCT_SINGLE_FETCH_FAILURE, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAILURE } from './actionTypes';

export const getProducts = (filters = {}) => async (dispatch) => {
    dispatch({ type: PRODUCT_FETCH_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        // Construct query parameters from filters object
        let queryParams = new URLSearchParams({
            page: filters.page || 1,
            limit: filters.limit || 6,
            ...filters, // Spread other filter properties
        }).toString();

        const response = await axios.get(`http://localhost:7002/products?${queryParams}`);

        if (response.status >= 200 && response.status < 300) {
            const { products, totalPages, currentPage, totalResults } = response.data;
            dispatch({
                type: PRODUCT_FETCH_SUCCESS,
                payload: { products, totalPages, currentPage, totalResults }
            });
        } else {
            dispatch({ type: PRODUCT_FETCH_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: PRODUCT_FETCH_FAILURE, payload: error });
    }
};
export const getSingleProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_SINGLE_FETCH_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(`http://localhost:7002/products/get-single-product/${id}`, config);

        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: PRODUCT_SINGLE_FETCH_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({ type: PRODUCT_SINGLE_FETCH_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: PRODUCT_SINGLE_FETCH_FAILURE, payload: error });
    }
};


export const deleteProducts = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.delete(`http://localhost:7002/products/delete-product/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status >= 200 && response.status < 300) {
            // fetchData();
            dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: response.data });
            dispatch(getProducts());
        }
        else {
            dispatch({ type: PRODUCT_DELETE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAILURE, payload: error });
        console.log(error);
    }
}


export const createProduct = (data) => async (dispatch) => {
    dispatch({ type: PRODUCT_CREATION_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            console.error('Token is missing');
            // Optionally, redirect to login or display an error message
            return;
        }

        const config = {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.post('http://localhost:7002/products/create-product', data, config);
        if (response.status >= 200 && response.status < 300) {
            dispatch({ type: PRODUCT_CREATION_SUCCESS, payload: response.data });
            alert('Successfull');
        } else {
            dispatch({ type: PRODUCT_CREATION_FAILURE, payload: response.data });
            console.error('Error creating product:', response.data);
        }
    } catch (error) {
        dispatch({ type: PRODUCT_CREATION_FAILURE, payload: error });
        console.error('Error creating product:', error);
    }
};


export const updateProduct = (id, data) => async (dispatch) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            console.error('Token is missing');
            return;
        }
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.patch(`http://localhost:7002/products/update-product/${id}`,data, config);
        if (response.status >= 200 && response.status < 300) {
            dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: response.data });
            alert('Successfull');
        } else {
            dispatch({ type: PRODUCT_UPDATE_FAILURE, payload: response.data });
            console.error('Error updating product:', response.data);
        }
    } catch (err) {
        dispatch({ type: PRODUCT_UPDATE_FAILURE, payload: err });
        console.error('Error updating product:', err);
    }
}




