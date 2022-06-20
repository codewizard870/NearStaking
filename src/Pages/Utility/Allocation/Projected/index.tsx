import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Tooltip, Image, Center, Divider, Button } from '@chakra-ui/react'
import {BigNumber} from 'bignumber.js'
import { getCoinParam } from '../../../../Util';
import { StableCoins } from '../../../../constants';
import AnimationNumber from '../../../Components/AnimationNumber';
import Warning from '../../../../assets/Warning.svg'
import { OpenDepositModal, useStore,  usePrice } from '../../../../store';

const Projected: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  
  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let total = new BigNumber(0);

  for (let i = 0; i < coins.length; i++) {
    let amount = new BigNumber(state.userInfos[i].amount + state.userInfos[i].reward_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** coins[i].decimals);

    total = total.plus(amount);
  }

  const dayReward = total.dividedBy(1000).multipliedBy(24);
  const remain = 60 - Math.floor((Date.now() - state.farmStartTime) / 1000 / 60 / 60 / 24);

  const farmInfo = state.farmInfo;
  const coinParam = getCoinParam("NEARt");
  const decimals = coinParam?.decimals?? 1;
  const cur_amount = new BigNumber(farmInfo.amount).dividedBy(10 ** decimals);

  const expected = (dayReward.toNumber() * remain + cur_amount.toNumber()) *  0.9771;

  return (
    <VStack w={'100%'} color={'#CEBFBF'} spacing={'20px'}>
      <HStack w={'100%'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          YOUR PROJECTED ALLOCATION VALUE
        </Text>
        <Tooltip 
          label="Your projected token share (x) the projected price" 
          background={'#C4C4C4'} hasArrow 
          placement='top-start' 
          color={'black'}
        > 
          <Image src={Warning} w={'13px'}/>
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
          USD
        </Text>
      </HStack>
    </VStack>
  );
}
export default Projected;