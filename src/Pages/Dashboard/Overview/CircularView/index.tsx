import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { useStore, usePrice} from '../../../../store';
import { floorNormalize, floor } from '../../../../Util';
const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const rate = usePrice();

  const history = state.amountHistory;
  const last = history.length - 1;
  const ustAmount = 0;
  const lunaAmount = 0;
                
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