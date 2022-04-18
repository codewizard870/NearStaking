import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { useStore, useUSTPrice, useLUNAPrice } from '../../../../store';
import { floorNormalize, floor } from '../../../../Util';
const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const ustPrice = useUSTPrice();
  const lunaPrice = useLUNAPrice();

  const history = state.amountHistory;
  const last = history.length - 1;
  const ustAmount = (last >= 0 ? floor(history[last].ust_amount * ustPrice) : 0 )+
                + floorNormalize(state.ust_total_rewards * ustPrice);
  const lunaAmount = (last >= 0 ? floor(history[last].luna_amount * lunaPrice) : 0)+
                + floorNormalize(state.luna_total_rewards * lunaPrice);
                
  const percent = ustAmount + lunaAmount > 0 ? lunaAmount * 100 / (ustAmount + lunaAmount) : 0;

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