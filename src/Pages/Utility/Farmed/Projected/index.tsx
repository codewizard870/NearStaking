import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Tooltip, Center, Divider, Button } from '@chakra-ui/react'

import AnimationNumber from '../../../Components/AnimationNumber';
import Warning from '../../../../assets/Warning.svg'
import { OpenDepositModal, useStore,  usePrice } from '../../../../store';

const Projected: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const ustDeposited = 0;
  const lunaDeposited = 0;
  const rate = usePrice();

  const total = ustDeposited + lunaDeposited * rate;
  const dayReward = total / 1000 * 24;

  const remain = 60 - Math.floor((Date.now() / 1000 - state.farmStartTime) / 60 / 60 / 24);

  const expected = Math.floor(dayReward * remain);

  return (
    <VStack w={'100%'} color={'#CEBFBF'} spacing={'12px'}>
      <HStack w={'100%'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          YOUR PROJECTED SHARE OF NearT TOKENS
        </Text>
        <Tooltip
          label="Your projected share with your current deposit value until the end of the farming event"
          background={'#C4C4C4'} hasArrow
          placement='top-start'
          color={'black'}
        >
          <Image src={Warning} w={'13px'} />
        </Tooltip>
      </HStack>
      <HStack w={'100%'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          <AnimationNumber value={expected} />
        </Text>
        <Text
          fontSize={'25px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          NearT
        </Text>
      </HStack>
    </VStack>
  );
}
export default Projected;