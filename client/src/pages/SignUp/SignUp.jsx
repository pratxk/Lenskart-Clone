import { Box, Button, FormControl, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { register } from '../../redux/auth-redux/action';

function SignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(data));
    }
    return (
        <>
            <Button onClick={onOpen}>Sign UP</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='#000042'>Create Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack textAlign='center' >
                            <form onSubmit={handleSubmit} color='#000042'>
                                <FormControl >
                                    <Box mb={7}>
                                        <Input borderRadius='14px' border='1px solid' borderColor='gray.300' type='text' name='first_name' placeholder='First Name*' height='60px' onChange={handleChange} />
                                    </Box>
                                    <Box mb={7}>
                                        <Input type='text' borderRadius='14px' border='1px solid' borderColor='gray.300' name='last_name' placeholder='Last Name' onChange={handleChange} height='60px' />
                                    </Box>
                                    <Box mb={7}>
                                        <Input type='number' name='ph_no'
                                            borderRadius='14px' border='1px solid' borderColor='gray.300'
                                            height='60px'
                                            placeholder='Mobile* ' onChange={handleChange} />
                                    </Box>
                                    <Box mb={7}>
                                        <Input type='email' borderRadius='14px' border='1px solid' borderColor='gray.300' height='60px' name='email' placeholder='Email*' onChange={handleChange} />
                                    </Box>
                                    <Box>
                                        <Input type='password' borderRadius='14px' border='1px solid' borderColor='gray.300' height='60px' placeholder='Password*' name='password' onChange={handleChange} />
                                    </Box>
                                </FormControl>
                                <Text fontSize='12px' fontWeight='400' mt={5} color='#000042'>By creating this account, you agree to our
                                    <Link textDecoration='underline' _hover={{
                                        color: '#000042'
                                    }} href='https://www.lenskart.com/privacy-policy'> Privacy Policy.</Link></Text>
                                <Button mt={7} w='sm' h='58px' borderRadius='40px' bg='#11daac' type='Submit'>Submit</Button>
                            </form>
                        </Stack>
                    </ModalBody>
                    <ModalFooter justifyContent='center'>
                        <Text color='#000042' fontSize='12px' fontWeight='400'>Have an account? <Link textDecoration='underline' _hover={{
                            color: '#000042'
                        }}>Sign In</Link></Text>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SignUp