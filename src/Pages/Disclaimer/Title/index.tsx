import React, { FunctionComponent } from 'react';
import { HStack, Flex, Text, Image, Link } from '@chakra-ui/react'

const Title: FunctionComponent = (props) => {
  return (
    <Flex ml={'13px'} w={'100%'} justify={'left'}  align={'baseline'} direction='column'>
      <Text
        fontSize={'40px'}
        fontWeight={'800'}
      >
        DISCLAIMER NEAR TREASURY

      </Text>
      {/* <Text
        fontSize='13px'
        fontWeight='800'
      >
        Updated: 20 May 22
      </Text> */}
    </Flex>
  );
}
export default Title;