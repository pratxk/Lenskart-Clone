import { PRODUCT_CREATION_FAILURE, PRODUCT_CREATION_REQUEST, PRODUCT_CREATION_SUCCESS, PRODUCT_DELETE_FAILURE, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_FETCH_FAILURE, PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS, PRODUCT_SINGLE_FETCH_FAILURE, PRODUCT_SINGLE_FETCH_REQUEST, PRODUCT_SINGLE_FETCH_SUCCESS, PRODUCT_UPDATE_FAILURE, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading: false,
    error: null,
    product: null,
    products: [],
    totalPages: 1,
    currentPage: 1,
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_FETCH_REQUEST:
        case PRODUCT_CREATION_REQUEST:
        case PRODUCT_UPDATE_REQUEST:
        case PRODUCT_DELETE_REQUEST:
        case PRODUCT_SINGLE_FETCH_REQUEST:
            return { ...state, isLoading: true, error: null };
        case PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            }; 
        case PRODUCT_CREATION_SUCCESS:
        case PRODUCT_UPDATE_SUCCESS:
        case PRODUCT_DELETE_SUCCESS:
        case PRODUCT_SINGLE_FETCH_SUCCESS:
            return { ...state, isLoading: false, product: action.payload };
        case PRODUCT_FETCH_FAILURE:
        case PRODUCT_CREATION_FAILURE:
        case PRODUCT_UPDATE_FAILURE:
        case PRODUCT_DELETE_FAILURE:
        case PRODUCT_SINGLE_FETCH_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
