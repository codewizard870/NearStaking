import React, { FunctionComponent, useState } from 'react';
import { Flex } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";
import { BigNumber } from 'bignumber.js'

import { StableCoins } from '../../../../constants';
import { useStore } from '../../../../store';
import { getCoinId } from '../../../../Util';
import Tab from './Tab';

interface Props {
  setInterest: Dispatch<SetStateAction<number>>,
}

const DateTimeTab: FunctionComponent<Props> = ({ setInterest }) => {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState('year');

  let rate = 1;
  switch (tab) {
    case 'year': rate = 365; break;
    case 'month': rate = 30; break;
    case 'week': rate = 7; break;
    case 'day': rate = 1; break;
  }

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let interest = new BigNumber(0);

  for (let i = 0; i < coins.length; i++) {
    let amount = new BigNumber(state.userInfos[i].amount + state.userInfos[i].reward_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** coins[i].decimals);
    let apy = Math.pow(1 + coins[i].apr / 100 / 365, rate);

    interest = interest.plus(amount.multipliedBy(apy-1));
  }

  setInterest(interest.toNumber());

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