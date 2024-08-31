import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
    Box,
    Button,
    FormControl,
    Heading,
    Input,
    Center,
    VStack,
    useToast,
    Select,
    FormLabel
} from "@chakra-ui/react";
import { getSingleProduct, updateProduct } from "../../redux/product-redux/action";
import { useDispatch, useSelector } from "react-redux";

const EditProduct = () => {
    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [imageTsrc, setImageTsrc] = useState("");
    const [price, setPrice] = useState("");
    const [mPrice, setMPrice] = useState("");
    const [shape, setShape] = useState("");
    const [gender, setGender] = useState("");
    const [style, setStyle] = useState("");
    const [dimension, setDimension] = useState("");
    const [productType, setProductType] = useState("");
    const [colors, setColors] = useState("");
    const [rating, setRating] = useState("");
    const [userRated, setUserRated] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productRefLink, setProductRefLink] = useState("");
    const [loading, setLoading] = useState(false);
    const product = useSelector((state) => state.product.product);

    useEffect(() => {
        // Fetch the product details
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setImageTsrc(product.imageTsrc || "");
            setPrice(product.price || "");
            setMPrice(product.mPrice || "");
            setShape(product.shape || "");
            setGender(product.gender || "");
            setStyle(product.style || "");
            setDimension(product.dimension || "");
            setProductType(product.productType || "");
            setColors(product.colors || "");
            setRating(product.rating || "");
            setUserRated(product.userRated || "");
            setProductId(product.productId || "");
            setQuantity(product.quantity || "");
            setProductRefLink(product.productRefLink || "");
        }
    }, [product]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = {
                imageTsrc,
                productRefLink,
                rating,
                userRated,
                price,
                mPrice,
                name,
                shape,
                gender,
                style,
                dimension,
                productType,
                colors,
                productId,
                quantity,
                id: Math.round(Math.random() * Date.now() * 10000000) // Consider removing this if unnecessary
            };
            await dispatch(updateProduct(id, payload));
            toast({
                title: "Product updated successfully.",
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "bottom"
            });
            navigate("/products"); // Redirect to product list or another page after updating
        } catch (error) {
            console.error("An error occurred:", error);
            toast({
                title: "An error occurred. Please try again",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "bottom"
            });
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box bg="gray.200" minH="710px">
            <Navbar />
            <br />
            <br />
            <Center>
                <VStack
                    w={{ lg: "650px", md: "650px", sm: "90%", base: "95%" }}
                    mb={{ lg: "0", md: "0", sm: "4", base: "4" }}
                    borderRadius="xl"
                    boxShadow="dark-lg"
                    p="10"
                    bg="whiteAlpha.900"
                >
                    <Heading>Edit Product</Heading>
                    <br />
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Product Name
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Image Url
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Image Url"
                            onChange={(e) => setImageTsrc(e.target.value)}
                            value={imageTsrc} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Discounted Price
                        </FormLabel>
                        <Input
                            type="number"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Discounted Price"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Original Price
                        </FormLabel>
                        <Input
                            type="number"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Original Price"
                            onChange={(e) => setMPrice(e.target.value)}
                            value={mPrice} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Frame Shape
                        </FormLabel>
                        <Select
                            placeholder="Choose Frame Shape"
                            onChange={(e) => setShape(e.target.value)}
                            value={shape} // Display the current value
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            bg="whiteAlpha.900"
                        >
                            <option value="Rectangle">Rectangle</option>
                            <option value="Round">Round</option>
                            <option value="Wayfarer">Wayfarer</option>
                            <option value="Butterfly">Butterfly</option>
                            <option value="Aviator">Aviator</option>
                            <option value="Wrapround">Wrap Round</option>
                            <option value="Cateye">Cateye</option>
                            <option value="Hexagon">Hexagon</option>
                            <option value="Square">Square</option>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Choose Gender
                        </FormLabel>
                        <Select
                            placeholder="Choose Gender"
                            value={gender} // Display the current value
                            onChange={(e) => setGender(e.target.value)}
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            bg="whiteAlpha.900"
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kid">Kid</option>
                        </Select>
                    </FormControl>
                    <br />

                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Frame Types
                        </FormLabel>
                        <Select
                            placeholder="Choose Frame Types"
                            onChange={(e) => setStyle(e.target.value)}
                            value={style} // Display the current value
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            bg="whiteAlpha.900"
                        >
                            <option value="Full-rim">Full-rim</option>
                            <option value="Rimless">Rimless</option>
                            <option value="Half-rim">Half-rim</option>
                            <option value="Low bridge">Low bridge</option>
                            <option value="Small">Small</option>
                            <option value="Oversized">Oversized</option>
                            <option value="Vintage">Vintage</option>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Dimension
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Dimension"
                            onChange={(e) => setDimension(e.target.value)}
                            value={dimension} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Product Type
                        </FormLabel>
                        <Select
                            placeholder="Choose Product Type"
                            onChange={(e) => setProductType(e.target.value)}
                            value={productType} // Display the current value
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            bg="whiteAlpha.900"
                        >
                            <option value="Sunglass">Sunglass</option>
                            <option value="Spectacle">Spectacle</option>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Available Colors
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Available Colors"
                            onChange={(e) => setColors(e.target.value)}
                            value={colors} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Rating
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Rating"
                            onChange={(e) => setRating(e.target.value)}
                            value={rating} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            User Rated
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter User Rated"
                            onChange={(e) => setUserRated(e.target.value)}
                            value={userRated} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Product ID
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Product ID"
                            onChange={(e) => setProductId(e.target.value)}
                            value={productId} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Quantity
                        </FormLabel>
                        <Input
                            type="number"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel fontSize="16px" h="25px">
                            Product Link
                        </FormLabel>
                        <Input
                            type="text"
                            size="lg"
                            fontSize="16px"
                            h="40px"
                            placeholder="Enter Product Link"
                            onChange={(e) => setProductRefLink(e.target.value)}
                            value={productRefLink} // Display the current value
                            bg="whiteAlpha.900"
                        />
                    </FormControl>
                    <br />
                    <Button
                        w="full"
                        bg="black"
                        color="white"
                        _hover={{ bg: "gray.600" }}
                        isLoading={loading}
                        onClick={handleEdit}
                    >
                        Save Changes
                    </Button>
                </VStack>
            </Center>
        </Box>
    );
};

export default EditProduct;
