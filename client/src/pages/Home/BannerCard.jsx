import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const BannerCard = ({link,alt}) => {
    return (
        <>
            <Box mt={3} mb={3} p={0}>
                <Image src={link} alt={alt} w='100%' />
            </Box>
        </>
    )
}

export default BannerCard