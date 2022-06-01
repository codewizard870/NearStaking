import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Tooltip, Center, Divider, Button } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js'

import { StableCoins, DECIMALS } from '../../../../constants';
import AnimationNumber from '../../../Components/AnimationNumber';
import Warning from '../../../../assets/Warning.svg'
import { OpenDepositModal, useStore, usePrice, useDeposited } from '../../../../store';

const Projected: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let total = new BigNumber(0);

  for (let i = 0; i < coins.length; i++) {
    let amount = new BigNumber(state.userInfos[i].amount + state.userInfos[i].reward_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** DECIMALS[i]);

    total = total.plus(amount);
  }

  const dayReward = total.dividedBy(1000).multipliedBy(24);
  const remain = 60 - Math.floor((Date.now() - state.farmStartTime) / 1000 / 60 / 60 / 24);
  const expected = Math.floor(dayReward.toNumber() * remain);

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