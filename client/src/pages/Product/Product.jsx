import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Select, Switch, Text, Image } from "@chakra-ui/react";
import { TbArrowsUpDown } from "react-icons/tb";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductFrame from "./ProductFrame";
import ProductFilter from "./ProductFilter";
import {
    Gender,
    ProductTypes,
    FrameColor,
    Frame1,
    Frame2
} from "./FilterDetails";
import { getProducts } from "../../redux/product-redux/action";

const Product = () => {
    const dispatch = useDispatch();
    const { products = [], isLoading, totalResults, totalPages } = useSelector((state) => state.product);

    const [types, setTypes] = useState("");
    const [page, setPage] = useState(1); // Start page at 1
    const [sort, setSort] = useState("");
    const [gender, setGender] = useState("");
    const [productRef, setProductRef] = useState("");

    useEffect(() => {
        const filters = { sort, productRef, types, gender, page };
        dispatch(getProducts(filters));
    }, [dispatch, page, sort, gender, types, productRef]);

    const handleFilterChange = (value, filterType) => {
        switch (filterType) {
            case 'productRef':
                setProductRef(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'types':
                setTypes(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Navbar />
            <Box>
                <Image
                    src="https://static1.lenskart.com/media/desktop/img/Mar23/spring/home/PLP%20Camapaign%20-%20WEB_1.jpg"
                    alt="img"
                    w="96%"
                    m="auto"
                />
                <Flex m="0" px="2%" gap="4" cursor="pointer">
                    <Flex
                        w="17%"
                        display={{ base: "none", xl: "inherit" }}
                        flexDirection="column"
                    >
                        <ProductFrame
                            heading={"FRAME TYPE"}
                            type={Frame1}
                            filter={(value) => handleFilterChange(value, 'productRef')}
                        />
                        <ProductFrame
                            heading={"FRAME SHAPE"}
                            type={Frame2}
                            filter={(value) => handleFilterChange(value, 'productRef')}
                        />
                        <ProductFilter
                            type={Gender}
                            heading={"GENDER"}
                            handlechange={(value) => handleFilterChange(value, 'gender')}
                            val={gender}
                            type1={ProductTypes}
                            heading1={"PRODUCT TYPE"}
                            handlechange1={(value) => handleFilterChange(value, 'types')}
                            val1={types}
                            type2={FrameColor}
                            heading2={"FRAME COLOR"}
                            handlechange2={setProductRef}
                            val2={productRef}
                        />
                        <hr />
                    </Flex>

                    <Box
                        overflow="scroll"
                        w={{ xl: "82%", base: "100%" }}
                        borderLeft="1px solid"
                        borderColor="gray.300"
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            p="7px"
                            bg="#e2e8f0"
                            borderColor="#ededed"
                        >
                            <Text fontSize="15px" color="gray.600" fontWeight="500">
                                EYEGLASSES & SUNGLASSES
                            </Text>
                            <Flex
                                alignItems="center"
                                display={{ md: "inherit", base: "none" }}
                            >
                                <Text fontWeight="bold" mr="5px" color="green" fontSize="15px">
                                    VIEW FRAMES
                                </Text>
                                <Switch colorScheme="green" isChecked size="lg" />
                                <Text ml="5px" fontSize="15px">
                                    VIEW 3D TRY ON
                                </Text>
                            </Flex>
                            <Flex>
                                <Flex alignItems="center">
                                    <TbArrowsUpDown color="green" fontWeight="bold" />
                                    <Text fontWeight="bold" color="green" fontSize="15px">
                                        Sort By
                                    </Text>
                                </Flex>
                                <Select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    border="0.1px"
                                    borderRadius="3px"
                                    borderColor="black"
                                    ml="4px"
                                    p="0px"
                                    fontSize="16px"
                                    bg="whiteAlpha.900"
                                >
                                    <option value="">Select</option>
                                    <option value="lowtohigh">Price: low to high</option>
                                    <option value="hightolow">Price: high to low</option>
                                </Select>
                            </Flex>
                        </Flex>
                        {totalResults > 0 && (
                            <Text mt="5px" textAlign="center" fontSize="15px">
                                Showing {products.length} of {totalResults} Results
                            </Text>
                        )}
                        {isLoading ? (
                            <Loading />
                        ) : products.length !== 0 ? (
                            <ProductCard type={products} />
                        ) : (
                            <Text
                                fontSize="28px"
                                fontWeight="bolder"
                                textAlign="center"
                                color="gray"
                                mt="5"
                            >
                                No Glasses Found
                            </Text>
                        )}
                    </Box>
                </Flex>
                <Pagination currentPage={page} setPage={setPage} totalPages={totalPages} />
            </Box>
            <Footer />
        </>
    );
};

export default Product;
