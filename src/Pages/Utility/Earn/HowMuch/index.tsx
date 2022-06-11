import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import Warning from '../../../../assets/Warning.svg'

import { OpenDepositModal, useStore } from '../../../../store';

const HowMuch: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  
  return (
    <Flex w={'100%'} direction="column" align={'baseline'}>
      <HStack>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          HOW MUCH NearT CAN I EARN?
        </Text>
        <a href="https://app.gitbook.com/s/kngrjQ3XHOHWXNeVNLmt/tt-protocol/community-farming" target={'_blank'} rel="noreferrer" >
          <Image src={Warning} w={'13px'}/>
        </a>
      </HStack>
      <Link href="/mypage#mypage_deposit">
        <Button 
          w={'350px'} 
          mt={'40px'} 
          h={'45px'} 
          background={'#493C3C'} 
          rounded={'25px'}
          // onClick = {() => OpenDepositModal(state, dispatch, "USDC")}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            STAKE NOW & GET FREE NearT 
          </Text>
        </Button>
      </Link>
    </Flex>
);
}
export default HowMuch;