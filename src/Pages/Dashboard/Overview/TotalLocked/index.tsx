import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Tooltip } from '@chakra-ui/react'
import BigNumber from 'bignumber.js';
import { useStore, usePrice } from '../../../../store';
import { floor, floorNormalize } from '../../../../Util';
import AnimationNumber from '../../../Components/AnimationNumber';

const TotalLocked: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  
  const history = state.amountHistory;
  const last = history.length - 1;

  const total = floor(last >= 0 ? history[last].totalUSD : new BigNumber(0));
  const upPercent = last >= 1 ? floor(100 *(history[last].totalUSD / history[last - 1].totalUSD - 1)) : 0;
  
  return (
    <>
      <Tooltip 
        label="TVL of the Near Treasury protocol" 
        background={'#C4C4C4'} hasArrow 
        placement='top-start' 
        color={'black'}
      > 
      <Text
        fontSize={'20px'}
        fontWeight={'800'}
        lineHeight={'20px'}
      >
        TOTAL VALUE LOCKED
      </Text>
      </Tooltip>
      <HStack spacing={'10px'} alignItems={'baseline'} mt='5px'>
        <Text
          fontSize={'35px'}
          fontWeight={'800'}
          lineHeight={'36px'}
        >
          <AnimationNumber value={total} />&nbsp;
        </Text>
        <Text
          ml = '0px !important'
          fontSize={'20px'}
          fontWeight={'800'}
          lineHeight={'36px'}
        >
          USD
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={'800'}
          lineHeight={'36px'}
          color={'green'}
        >
          {upPercent > 0 ? `▲${upPercent}` : `▼${-1 * upPercent}`}%
        </Text>
      </HStack>
    </>
  );
}
export default TotalLocked;