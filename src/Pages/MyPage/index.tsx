import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Stack, VStack, Flex, HStack, Button } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider, useInfiniteQuery } from "react-query"
import { COINTYPE } from '../../store';

import Title from './Title'
import TotalValue from './TotalValue';
import TotalPayed from './TotalPayed';
import DepositTab from './DepositTab';
import CoinPanel from './CoinPanel';
import TransactionHistory from './TransactionHistory';
import { StableCoins } from '../../constants';

const MyPage: FunctionComponent = (props) => {
  const [depositTab, setDepositTab] = useState('all');
  const [coinList, setCoinList] = useState(StableCoins);
  
  useEffect(() => {
    if (depositTab == 'stable')
      setCoinList(StableCoins.filter(coin => coin.stable == true));
    else if (depositTab == 'volatile')
      setCoinList(StableCoins.filter(coin => coin.stable != true));
    else
      setCoinList(StableCoins)
  }, [depositTab]);

  return (
    <Flex
      direction='column'
      mt={'15px'}
      px={{ sm: '10px', md: '20px', lg: '110px' }}
      w={'100%'}
    >
      <Title />
      <Stack
        mt={'53px'}
        direction={{ sm: 'column', md: 'column', lg: 'row' }}
        spacing={'55px'}
        w={'100%'}
        h='434px'
      >
        <TotalValue />
        <TotalPayed />
      </Stack>
      <DepositTab depositTab={depositTab} setDepositTab={setDepositTab} />
      <Flex flexWrap={'wrap'} justify='space-between'>
        {coinList.map((item) => (
          <CoinPanel
            name={item.name as COINTYPE}
            description={item.description}
            stable={item.stable}
            avatar={item.avatar}
            apr={item.apr}
            upcoming={item.upcoming}
          />
        ))}
      </Flex>
      <TransactionHistory />
    </Flex>
  );
}
export default MyPage;

