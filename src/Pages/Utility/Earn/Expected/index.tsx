import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import AnimationNumber from '../../../Components/AnimationNumber';
import { useStore } from '../../../../store';

interface Props {
  amount: string,
}
const Expected: FunctionComponent<Props> = ({ amount }) => {
  const { state, dispatch } = useStore();
  const total = parseInt(amount);
  const dayReward = total / 1000 * 24;

  let remain = 60 - Math.floor((Date.now() - state.farmStartTime) / 1000 / 60 / 60 / 24);
  remain = remain > 0 ? remain : 60;
  const expected = Math.floor(dayReward * remain);
  const expectedUSD = Math.floor(expected * 1.25);

  return (
    <Flex w={'100%'} h={'100%'} direction="column" align={'baseline'} justify='center'>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'20px'}
      >
        <AnimationNumber value={expected} />
      </Text>
      <Divider orientation='horizontal' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'20px'}
      >
        Your expected NearT Allocation
      </Text>
      <Text
        mt={'40px'}
        position={'absolute'}
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'36px'}
        fontStyle={'italic'}
        color={'#CEBFBF'}
      >
        The Projected Allocation Value: {expectedUSD.toLocaleString()}USD
      </Text>
    </Flex>
  );
}
export default Expected;