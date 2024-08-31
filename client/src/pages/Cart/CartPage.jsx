import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartLength from "./CartLength";
import CartItem from "./CartItem";
import PriceDetail from "./priceDetail";
import SaleBox from "./SaleBox";
import CartEmpty from "./CartEmpty";
import CouponBox from "./CouponBox";
import { Flex, Text, Button } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getCartItems } from "../../redux/cart-redux/action";

const CartPage = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getTotalPrice = () => {
        const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.mPrice * item.qty,
            0
        );
        return totalPrice;
    };

    const getdiscountPrice = () => {
        const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        );
        return totalPrice;
    };
    useEffect(()=>{
        dispatch(getCartItems());
    },dispatch)

    return (
        <>
            <Navbar />
            {cartItems.length > 0 ? (
                <Flex
                    width={"90%"}
                    margin="auto"
                    border={"0px solid red"}
                    marginTop={"20px"}
                    marginBottom="20px"
                    gap={16}
                    flexDirection={{
                        base: "column",
                        sm: "column",
                        md: "column",
                        lg: "row",
                        xl: "row",
                        "2xl": "row"
                    }}
                >
                    <Flex
                        flexDirection={"column"}
                        gap="5"
                        border={"0px solid black"}
                        width={{
                            base: "95%",
                            sm: "95%",
                            md: "95%",
                            lg: "60%",
                            xl: "65%",
                            "2xl": "65%"
                        }}
                    >
                        <CartLength cartLength={cartItems.length} />
                        <CartItem />
                    </Flex>
                    <Flex
                        flexDirection={"column"}
                        border={"0px solid blue"}
                        width={{
                            base: "95%",
                            sm: "95%",
                            md: "95%",
                            lg: "35%",
                            xl: "27%",
                            "2xl": "27%"
                        }}
                        gap={"5"}
                    >
                        <Text
                            fontSize="20px"
                            fontFamily="sans-serif"
                            border={"0px solid red"}
                            fontWeight={500}
                        >
                            Bill Details
                        </Text>
                        <PriceDetail
                            totalPrice={getTotalPrice()}
                            discountPrice={getdiscountPrice()}
                        />
                        <SaleBox />

                        <CouponBox />
                        <Button
                            backgroundColor={"#12daac"}
                            color="#091e52"
                            borderRadius={"20px"}
                            padding="16px 24px 16px 24px"
                            fontSize={"16px"}
                            height="56px"
                            fontWeight={"700"}
                            onClick={() => navigate("/shipping")}
                        >
                            Proceed To Checkout
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                <CartEmpty />
            )}
            <Footer />
        </>
    );
};

export default CartPage;