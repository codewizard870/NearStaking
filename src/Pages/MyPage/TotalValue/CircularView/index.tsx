import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useBalance, useNearDeposited, useStore, usePrice } from '../../../../store';
import { floor, floorNormalize } from '../../../../Util';

const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const rate = usePrice();

  // const ustBalance = useBalance();
  // const ustDeposited = 0;
  // const lunaDeposited = 0;
  // const total = ustBalance + ustDeposited + lunaDeposited;

  // const init = !state.connected;
  // const percent1 = init? 75: Math.floor(ustBalance * 100 / total);
  // const percent2 = init? 75: Math.floor(ustDeposited * 100 / total);
  // const percent3 = init? 75: Math.floor(lunaDeposited * 100 / total);

  const percent1 = 75
  const percent2 = 75
  const percent3 = 75

  return (
    <Flex align={'center'} minWidth={'220px'} h={'220px'} justify='center' transform={'rotate(-90deg)'} mr={'36px'}>
      <CircularProgress
        position={'absolute'}
        value={percent1}
        size={'220px'}
        capIsRound={true}
        color={'#F72585'}
        trackColor={'#493C3C'}
        thickness='8px'
      />
      <CircularProgress
        position={'absolute'}
        value={percent2}
        size={'165px'}
        capIsRound={true}
        color={'#000000'}
        trackColor={'#493C3C'}
        // thickness='12px'
      />
      <CircularProgress
        position={'absolute'}
        value={percent3}
        size={'110px'}
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'#493C3C'}
        thickness='15px'
      />
    </Flex>
  );
}
export default CircularView;