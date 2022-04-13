import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Image, Link } from '@chakra-ui/react'
import { useStore, useExchangeRate, useLUNADeposited } from '../../../../store';
import { floor, floorNormalize } from '../../../../Util';

const TotalLocked: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  
  const rate = useExchangeRate();
  const rewards = floorNormalize(state.ust_total_rewards + state.luna_total_rewards * rate)

  const history = state.amountHistory;
  const last = history.length - 1;
  const total = floor((last >= 0 ? history[last].totalUST ?? 0 : 0) + rewards);

  const _upPercent = last >= 1 ? (history[last].usd / history[last - 1].usd - 1) : 0;
  const upPercent = _upPercent > 0 ? floor(_upPercent * 100) : 0;
console.log(_upPercent);
console.log(history)
  return (
    <>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TOTAL VALUE LOCKED
      </Text>
      <HStack spacing={'10px'} alignItems={'baseline'}>
        <Text
          fontSize={'34px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          {total.toLocaleString()}&nbsp;
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          UST
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={'860'}
          lineHeight={'36px'}
          color={'green'}
        >
          ▲ {upPercent}%
        </Text>
      </HStack>
    </>
  );
}
export default TotalLocked;