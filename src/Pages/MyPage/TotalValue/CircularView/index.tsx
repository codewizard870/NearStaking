import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js';
import { useBalance, useStore, usePrice } from '../../../../store';
import { DoughnutChart, ChartItem } from "./DoughnutGraph";

interface Props {
  total: BigNumber,
  stable: BigNumber,
  volatile: BigNumber,
}
const CircularView: FunctionComponent<Props> = ({ total, stable, volatile }) => {
  const { state, dispatch } = useStore();
  const sum = total;

  const percent1 = sum.isEqualTo(0) ? 75 : 90;
  const percent2 = sum.isEqualTo(0) ? 75 : stable.dividedBy(sum).multipliedBy(100).toNumber();
  const percent3 = sum.isEqualTo(0) ? 75 : 100 - percent2;

  const data: ChartItem[] = [
    {
      label: "1",
      color: ["#493C3C", "#F72585" ],
      value: percent1,
      total: 100 - percent1,
    },
    {
      label: "2",
      color: ["#493C3C", "#000000" ],
      value: percent2,
      total: 100 - percent2,
    },
    {
      label: "3",
      color: ["#493C3C", "#F9D85E" ],
      value: percent3,
      total: 100 - percent3,
    },
  ];
  return (
    <Flex
      align={'center'}
      minWidth={'220px'}
      w="220px"
      h={'220px'}
      justify='center'
      transform={'scaleY(-1)'} 
      mr={'36px'}
    // animation='spin1 0.3s linear'
    // position="relative"
    >
      {/* <CircularProgress
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
      /> */}
      <DoughnutChart
        data={data}
      // onFocus={null}
      />
    </Flex>
  );
}
export default CircularView;