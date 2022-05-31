import React, { FunctionComponent } from 'react';
import { VStack, Stack, Flex } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js'

import { useStore } from '../../../store';
import { getCoinId } from '../../../Util';
import { StableCoins, DECIMALS } from '../../../constants';
import CircularView from './CircularView';
import Total from './Total';
import Seperator from './Seperator';

const TotalValue: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let stable = new BigNumber(0);
  let volatile = new BigNumber(0);
  let total = new BigNumber(0);

  for (let i = 0; i < coins.length; i++) {
    total = total.plus(state.balance[i].multipliedBy(state.price[i]).dividedBy(10 ** DECIMALS[i]));

    let amount = new BigNumber(state.userInfos[i].amount + state.userInfos[i].reward_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** DECIMALS[i]);

    if(coins[i].stable)
      stable = stable.plus(amount);
    else
      volatile = volatile.plus(amount);
  }

  return (
    <VStack
      w={{ sm: '100%', md: '100%', lg: '696px' }}
      minW={{ sm: '100%', md: '100%', lg: '696px' }}
      rounded={'25px'}
      background={'#212121'}
      align={'center'}
      spacing={'34px'}
      px={{ sm: '10px', md: '20px', lg: '50px' }}
      py={{ sm: '10px', md: '20px', lg: '60px' }}
    >
      <Total total={total} />
      <Flex
        w={'100%'}
        direction={{ sm: 'column', md: 'column', lg: 'row' }}
        align={'center'}
        justify={'space-between'}
      >
        <Seperator total={total} stable={stable} volatile={volatile} />
        <CircularView total={total} stable={stable} volatile={volatile}  />
      </Flex>
    </VStack>
  );
}
export default TotalValue;