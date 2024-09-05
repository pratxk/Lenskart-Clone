import axios from "axios";
import { USER_FETCH_FAILURE, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAILURE, USER_LOGOUT_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./actionTypes";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../store";
// import { useHistory } from 'react-router-dom';

export const register = (credentials) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const response = await axios.post(`https://lenskart-clone-fwxo.onrender.com/users/register`, credentials);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
        alert('Registered Successfully');
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILURE, payload: error.message });
    }
};


export const login = (credentials) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST })
    try {
        const res = await axios.post(`https://lenskart-clone-fwxo.onrender.com/users/login`, credentials);
        const data = res.data;
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('role', JSON.stringify(data.role));
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILURE, payload: error.message })
        console.log(error)
    }

}

export const fetchUserData = () => async (dispatch) => {
    dispatch({ type: USER_FETCH_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`https://lenskart-clone-fwxo.onrender.com/users/register/users/me`, config);
        dispatch({ type: USER_FETCH_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: USER_FETCH_FAILURE, payload: error.message });
    }
};


export const logout = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.get(`${API_URL}/users/logout`, config);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        dispatch({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: USER_LOGOUT_FAILURE, payload: error.message });
    }
};