import React, { FunctionComponent } from 'react';
import { Stack, VStack, Flex, Text } from '@chakra-ui/react'
import * as nearAPI from "near-api-js";

import Title from './Title'
import Overview from './Overview';
import CoinPanel from './CoinPanel';
// import UstPanel from './UstPanel';
// import LunaPanel from './LunaPanel';
import How from './How';
import TVL from './TVL';

const Dashboard: FunctionComponent = (props) => {
  return (
    <VStack 
      mt={'15px'} 
      px={{sm:'10px', md:'20px', lg:'110px'}}
      w={'100%'}
      spacing={'53px'}
    >
      <Title />
      <Overview/>
      <CoinPanel />
      <How />
      <TVL />
    </VStack>
  );
}
export default Dashboard;