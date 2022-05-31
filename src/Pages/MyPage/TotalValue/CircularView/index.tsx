import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js';
import { useBalance, useStore, usePrice } from '../../../../store';
import { floor, floorNormalize } from '../../../../Util';

interface Props {
  total: BigNumber,
  stable: BigNumber,
  volatile: BigNumber,
}
const CircularView: FunctionComponent<Props> = ({ total, stable, volatile }) => {
  const { state, dispatch } = useStore();
  const rate = usePrice();

  const sum = total.plus(stable).plus(volatile);

  const percent1 = sum.isEqualTo(0) ? 75: total.dividedBy(sum).multipliedBy(100).toNumber();
  const percent2 = sum.isEqualTo(0) ? 75: stable.dividedBy(sum).multipliedBy(100).toNumber();
  const percent3 = sum.isEqualTo(0) ? 75: volatile.dividedBy(sum).multipliedBy(100).toNumber();

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