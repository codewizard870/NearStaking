import React, { FunctionComponent } from 'react';
import { HStack, Flex, Text, Image, Link } from '@chakra-ui/react'

import ExternalLink from "./../../../assets/Docs.svg"

const Title: FunctionComponent = (props) => {
  return (
    <Flex ml={'13px'} w={'100%'} justify={'left'}  align={'flex-end'}>
      <Text
        fontSize={'40px'}
        fontWeight={'800'}
      >
        DASHBOARD
      </Text>
      <Link href={'https://near-treasury.gitbook.io/near-treasury-tm/near-treasury-tm/home'} target="_blank">
        <HStack spacing={'3px'}  pb={'15px'}>
          {/* <Text ml='13px' color='#CEBFBF'>
            Docs
          </Text> */}
          <Image src={ExternalLink}  h={'16px'} ml='13px'/>
        </HStack>
      </Link>
      
    </Flex>
  );
}
export default Title;