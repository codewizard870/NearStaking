import React, { FunctionComponent, useState } from 'react';
import { Flex } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";
import {BigNumber} from 'bignumber.js'

import { DECIMALS } from '../../../../constants';
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

  let coinId = getCoinId('DAI');
  let amount = new BigNumber(state.userInfos[coinId].amount + state.userInfos[coinId].reward_amount);
  amount = amount.multipliedBy(state.price[coinId]).dividedBy(10 ** DECIMALS[coinId]);

  const apr = state.apr[coinId];

  setInterest(amount.toNumber() * apr / 100 * rate);

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