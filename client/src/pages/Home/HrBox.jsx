import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const HrBox = ({ content, fs }) => {
    return (
        <Flex gap={5} align="center" ml="5%" mr="5%">
            <Box
                as="hr"
                display={{ base: 'none', md: 'block' }}
                width="55%"
            />
            <Text fontSize={fs || '36px'} textAlign="center" w='100%' m={0}>
                {content}
            </Text>
            <Box
                as="hr"
                display={{ base: 'none', md: 'block' }}
                width="55%"
            />
        </Flex>

    );
};

export default HrBox;