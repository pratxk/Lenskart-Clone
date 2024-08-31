import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from 'redux-thunk'
import {logger} from 'redux-logger'
import { authReducer } from "./auth-redux/authReducer";
import { productReducer } from "./product-redux/productReducer";
import { cartReducer } from "./cart-redux/cartReducer";

export const API_URL = import.meta.env.VITE_API_URL;

const rootReducer = combineReducers({
    auth:authReducer,
    product:productReducer,
    cart:cartReducer
});

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk,logger));