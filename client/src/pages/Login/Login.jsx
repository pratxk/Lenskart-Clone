import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, InputRightElement, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { login } from '../../redux/auth-redux/action';

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(data));
    }

    if (isAuthenticated) {
        toast({
            description: "Logged in successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
        });
        return <Navigate to={'/'} />
    }
    return (
        <>
            <Button onClick={onOpen}>Log In</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={{ xl: "md", lg: "md", md: "md", sm: "md", base: "sm" }}
            >
                <ModalOverlay />
                <ModalContent rounded="3xl">
                    <ModalCloseButton
                        borderRadius={"50%"}
                        bg="white"
                        m={"10px 10px 0px 0px"}
                    />

                    <ModalBody p={"0px 0px "} borderRadius={"15px 15px 15px 15px "}>
                        <Image
                            src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
                            alt="pic"
                            borderRadius={"10px 10px 0px 0px "}
                        />
                        <Box m={"34px 45px 50px 45px"}>
                            <Heading
                                fontFamily={" Times, serif"}
                                fontWeight="100"
                                fontSize={"28px"}
                                mb="24px"
                                color={"#333368"}
                            >
                                Sign In
                            </Heading>

                            <form onSubmit={handleSubmit} color='#000042'>
                                <FormControl >
                                    <Box mb={7}>
                                        <Input type='email' borderRadius='14px' border='1px solid' borderColor='gray.300' height='60px' name='email' placeholder='Email*' onChange={handleChange} />
                                    </Box>
                                    <Box>
                                        <Input type='password' borderRadius='14px' border='1px solid' borderColor='gray.300' height='60px' placeholder='Password*' name='password' onChange={handleChange} />
                                    </Box>
                                </FormControl>
                                <Box
                                    textDecoration={"underline"}
                                    m="15px 0px 0px 0px"
                                    color="#000042"
                                    fontSize="15px"
                                >
                                    Forget Password
                                </Box>

                                <HStack fontSize="16px">
                                    <Checkbox mb={"20px"} mt="20px" size="sm">
                                        Get Update on whatsapp
                                    </Checkbox>
                                    <Image
                                        src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                                        w={"22px"}
                                        h="22px"
                                    />
                                </HStack>
                                <Button
                                    bgColor={"#11daac"}
                                    width="100%"
                                    borderRadius={"35px/35px"}
                                    h="50px"
                                    fontSize="18px"
                                    type='submit'
                                    _hover={{ backgroundColor: "#11daac" }}
                                >
                                    Sign In
                                </Button>
                            </form>

                            <HStack spacing={"0px"} mt="19px" gap="2">
                                <Box fontSize={"14px"}> New member?</Box>
                                <Link
                                    fontSize={"15px"}
                                    fontWeight="500"
                                    textDecoration={"underline"}
                                >
                                    Create an Account
                                </Link>
                            </HStack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}

export default Login