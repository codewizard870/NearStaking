import React, { FunctionComponent, useState } from 'react';
import { Flex } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";
import {BigNumber} from 'bignumber.js'

import { DECIMALS, StableCoins } from '../../../../constants';
import { useStore } from '../../../../store';
import { getCoinId } from '../../../../Util';
import Tab from './Tab';

interface Props {
  setInterest: Dispatch<SetStateAction<number>>,
}

const DateTimeTab: FunctionComponent<Props> = ({setInterest}) => {
  const {state, dispatch} = useStore();
  const [tab, setTab] = useState('year');

  let rate = 1;
  switch (tab) {
    case 'year': rate = 1; break;
    case 'month': rate = 1 / 12; break;
    case 'week': rate = 1 / 54; break;
    case 'day': rate = 1 / 365; break;
  }

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let stable = new BigNumber(0);
  let volatile = new BigNumber(0);
  let total = new BigNumber(0);

  for (let i = 0; i < coins.length; i++) {
    let amount = new BigNumber(state.userInfos[i].amount + state.userInfos[i].reward_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** DECIMALS[i]);

    if(coins[i].stable)
      stable = stable.plus(amount);
    else
      volatile = volatile.plus(amount);
  }

  const stableApr= 20, volatileApr=10;
  const stableExpected = stable.multipliedBy(stableApr * rate / 100);
  const volatileExpected = volatile.multipliedBy(volatileApr * rate / 100);
  setInterest(stableExpected.toNumber() + volatileExpected.toNumber());

  return (
    <Flex
      w={'100%'}
      h={'49px'}
      mt={'56px'}
      rounded={'25px'}
      background={'#212121'}
      align={'center'}
    >
      <Tab id='year' current={tab} setCurrent={setTab}>YEAR</Tab>
      <Tab id='month' current={tab} setCurrent={setTab}>MONTH</Tab>
      <Tab id='week' current={tab} setCurrent={setTab}>WEEK</Tab>
      <Tab id='day' current={tab} setCurrent={setTab}>DAY</Tab>
    </Flex>
  );
}
export default DateTimeTab;