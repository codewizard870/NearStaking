import React, { FunctionComponent } from 'react';
import { Stack, VStack, HStack, Flex, Button } from '@chakra-ui/react'

import Title from './Title'
import Total from './Total';
import CoinPanel from '../MyPage/CoinPanel';
import Expected from './Expected';
import { StableCoins } from '../../constants';
import { COINTYPE } from '../../store';

const MyPage: FunctionComponent = (props) => {
  return (
    <Flex
      direction='column' 
      mt={'15px'} 
      px={{sm:'10px', md:'20px', lg:'110px'}}
      w={'100%'}
    >
      <Title />
      <Total />
      <Flex flexWrap={'wrap'} justify='space-between' mt='29px'>
        {StableCoins.map((item) => (
          <CoinPanel 
            name = {item.name as COINTYPE}
            description = {item.description}
            stable = {item.stable}
            avatar = {item.avatar}
            apr = {item.apr}
            upcoming = {item.upcoming}
          />
        ))}
      </Flex>
      <Expected />
    </Flex>
  );
}
export default MyPage;