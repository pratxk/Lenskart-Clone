import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Grid, GridItem, Image } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCardS from "./ProductCardS";
import { ProductImages } from "./ProductImages";
import Footer from "../../components/Footer/Footer";
import { createCartItem } from "../../redux/cart-redux/action";

const SingleProduct = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);

    const handleAddToCart = () => {
        if (isAuthenticated) {
            const existingItem = cartItems.findIndex((item) => item._id === data._id);
            if (existingItem === -1) {
                data.quantity = 1;
                dispatch(createCartItem(data));
                // setTimeout(() => {
                //     navigate("/cart");
                // }, 1000);
            } else {
                alert("Product Already Add in Cart");
            }
        }
        else {
            alert("Please Login First");
        }

    };

    const handleAddToWishlist = () => {
        if (isAuthenticated) {
            // dispatch(addToWishlist(data));
            // setTimeout(() => {
            //     navigate("/wishlist");
            // }, 1000);
        }
        else {
            alert("Please Login First");
        }
    };

    const fetchSingleProduct = () => {
        axios(`${API_URL}/products/${id}`)
            .then((res) => setData(res.data.product))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchSingleProduct();
    }, [id]);

    return (
        <>
            <Navbar />
            < br />
            <br />

            < Grid
                gap={5}
                m="auto"
                w="95%"
                justifyContent="space-around"
                templateColumns={{
                    base: "repeat(1,1fr)",
                    sm: "repeat(1,1fr)",
                    md: "repeat(2,1fr)",
                    lg: "repeat(3,1fr)"
                }
                }
            >
                <GridItem
                    borderRadius={10}
                    p="80px 5px"
                    border="1px solid"
                    borderColor="gray.300"
                    display={{ lg: "inherit", base: "none" }}
                    _hover={{ transform: "scale(1.1)" }}
                >
                    <Image src={data.imageTsrc} />
                </GridItem>
                < GridItem
                    borderRadius={10}
                    p="80px 5px"
                    border="1px solid"
                    borderColor="gray.300"
                    w={{ lg: "100%", sm: "80%", base: "80%" }}
                    m="auto"
                >
                    <Image _hover={{ transform: "scale(1.1)" }} src={data.imageTsrc} />
                </GridItem>
                < GridItem
                    p={5}
                    colSpan={1}
                    rowSpan={10}
                    m="auto"
                    justifyContent="center"
                >
                    <ProductCardS
                        type={data}
                        handleCart={handleAddToCart}
                        handleWishlist={handleAddToWishlist}
                    />
                </GridItem>

                {
                    ProductImages.map((ele, i) => (
                        <GridItem
                            _hover={{ transform: "scale(1.1)" }}
                            display={{ lg: "inherit", base: "none" }}
                            borderRadius={10}
                            p="80px 5px"
                            border="1px solid"
                            borderColor="gray.300"
                            key={i}
                        >
                            <Image src={ele.src} />
                        </GridItem>
                    ))}

                <GridItem
                    _hover={{ transform: "scale(1.1)" }}
                    display={{ lg: "inherit", base: "none" }}
                    borderRadius={10}
                    p="80px 5px"
                    border="1px solid"
                    borderColor="gray.300"
                >
                    <Image src={data.imageTsrc} />
                </GridItem>
                < GridItem
                    _hover={{ transform: "scale(1.1)" }}
                    display={{ lg: "inherit", base: "none" }}
                    borderRadius={10}
                    p="80px 5px"
                    border="1px solid"
                    borderColor="gray.300"
                >
                    <Image src={data.imageTsrc} />
                </GridItem>
            </Grid>
            < Footer />
        </>
    );
};

export default SingleProduct;