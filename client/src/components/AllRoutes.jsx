import React, { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home/Home';
import Product from '../pages/Product/Product';
import SingleProduct from '../pages/SingleProduct/SingleProduct';
import CartPage from '../pages/Cart/CartPage';
import Shipping from '../pages/Shipping/Shipping';
import Orders from '../pages/Orders/Orders';
import Payment from '../pages/Payment/Payment';
import Confirm from '../pages/confirm/Confirm';
import PrivateRoute from './PrivateRoute';
import ProductPost from '../pages/Admin/ProductPost';
import EditProduct from '../pages/Admin/EditProduct';
import RoleBasedRoute from './RoleBasedRoute';
import ProductList from '../pages/Admin/ProductList';

const AllRoutes = () => {
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Product />} />
                <Route path="/products/:id" element={<SingleProduct />} />

                <Route path="/cart" element={
                    <PrivateRoute>
                        <CartPage />
                    </PrivateRoute>
                } />
                <Route path="/Shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
                <Route path="/checkout" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                <Route path="/confirm" element={<PrivateRoute><Confirm /></PrivateRoute>} />
                <Route path="/product-list" element={
                <RoleBasedRoute allowedRoles={['admin']}><ProductList /></RoleBasedRoute>} />
                <Route path="/product-post" element={<RoleBasedRoute allowedRoles={['admin']}><ProductPost /></RoleBasedRoute>} />
                <Route path="/edit-product/:id" element={<RoleBasedRoute allowedRoles={['admin']}><EditProduct /></RoleBasedRoute>} />
            </Routes>
        </>
    )
}

export default AllRoutes