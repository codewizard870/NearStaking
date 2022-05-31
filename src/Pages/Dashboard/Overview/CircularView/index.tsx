import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import {BigNumber} from 'bignumber.js';

import { StableCoins, DECIMALS } from '../../../../constants';
import { useStore, usePrice} from '../../../../store';

const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();

  const history = state.amountHistory;
  const price = state.price;
  const last = history.length - 1;

  let stable = new BigNumber(0);
  let volatile = new BigNumber(0);
  let percent = 0;

  if (last > 0) {
    let coins = StableCoins.filter((coin) => !coin.upcoming);
    for (let j = 0; j < coins.length; j++) {
      let usd = new BigNumber(history[last].amount[j] + history[last].reward[j]);
      usd = usd.multipliedBy(price[j]).dividedBy(10 ** DECIMALS[j]);

      if (coins[j].stable)
        stable = stable.plus(usd);
      else
        volatile = volatile.plus(usd);
    }
    let percent_big = stable.dividedBy(stable.plus(volatile)).multipliedBy(100);
    percent = percent_big.toNumber();
  }

  return (
    <Flex transform={'rotate(90deg)'}>
      <CircularProgress
        value={percent}
        size={'172px'}
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'black'}
        thickness='14'
      >
      </CircularProgress>
    </Flex>
  );
}
export default CircularView;