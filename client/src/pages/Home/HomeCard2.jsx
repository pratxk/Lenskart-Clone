import { Box, Flex, Image, Spacer } from '@chakra-ui/react'
import React from 'react'
import Slider from './Slider'

const HomeCard2 = ({type,src}) => {
    return (
        <>
            <Box
                justifyContent='left' m='auto' mt='6' cursor='pointer' w='95%'>
                <Flex>
                    <Box
                        boxSize='sm'
                        w={{
                            base: 'none',
                            xl: '50%'
                        }}
                        cursor='pointer'
                        pr={{ base: '0', lg: '4' }}>
                        <Image
                            src={src}
                            boxSize="700px"
                            h="200px"
                            w={{
                                xs: "80%",
                                sm: "80%",
                                md: "80%",
                                lg: "100%",
                                xl: "100%",
                                base: "none"
                            }}
                        />
                    </Box>
                    <Spacer/>
                    <Box
                    w={{base:'100%', xl:'75%'}}>
                        <Slider type={type}/>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default HomeCard2