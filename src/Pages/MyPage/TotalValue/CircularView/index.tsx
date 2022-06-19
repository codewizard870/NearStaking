import React, { FunctionComponent, useState, useEffect } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js';
import { useBalance, useStore, usePrice } from '../../../../store';
import { DoughnutChart, ChartItem } from "./DoughnutGraph";
import { sleep } from '../../../../Util';

interface Props {
  total: BigNumber,
  stable: BigNumber,
  volatile: BigNumber,
}
const CircularView: FunctionComponent<Props> = ({ total, stable, volatile }) => {
  const { state, dispatch } = useStore();
  const [percent, setPercent] = useState([0, 0, 0]);
  const [running, setRunning] = useState<any>(null);
  const sum = total;

  const percent1 = sum.isEqualTo(0) ? 75 : 96;
  const percent2 = sum.isEqualTo(0) ? 75 : stable.dividedBy(sum).multipliedBy(100).toNumber();
  const percent3 = sum.isEqualTo(0) ? 75 : 100 - percent2;

  // const data: ChartItem[] = [
  //   {
  //     label: "1",
  //     color: ["#493C3C", "#F72585" ],
  //     value: percent1,
  //     total: 100 - percent1,
  //   },
  //   {
  //     label: "2",
  //     color: ["#493C3C", "#000000" ],
  //     value: percent2,
  //     total: 100 - percent2,
  //   },
  //   {
  //     label: "3",
  //     color: ["#493C3C", "#F9D85E" ],
  //     value: percent3,
  //     total: 100 - percent3,
  //   },
  // ];
  useEffect(() => {
    setPercent([percent1, percent2, percent3]);
  }, [percent1, percent2, percent3] );
  // useEffect(() => {
  //   function animateValue(percent: number[]) {
  //     var current = [0, 0, 0];
  //     var increment = [0, 0, 0];
  //     var count = 0;
  //     const step = 200;

  //     for (let i = 0; i<percent.length; i++)
  //       increment[i] = percent[i]/step;

  //     let timeOut = 100;
  //     if(running){
  //       clearInterval(running);
  //       setRunning(null);
  //       setPercent([0, 0, 0]);
  //       timeOut = 1000;
  //     }

  //     setTimeout(() => {
  //       var timer = setInterval(function () {
  //         for (let i = 0; i<percent.length; i++)
  //           current[i] += increment[i];
  
  //         setPercent([...current]);
  //         count++;
  
  //         if (count >= step) {
  //           clearInterval(timer);
  //         }
  //       }, 10);
  
  //       setRunning(timer);
  //     }, timeOut)
  //   }

  //   animateValue([percent1, percent2, percent3])
  //   // setPercent([percent1, percent2, percent3]);
  // }, [percent1, percent2, percent3]);

  return (
    <Flex
      align={'center'}
      minWidth={'220px'}
      w="220px"
      h={'220px'}
      justify='center'
      mr={'36px'}
      transform={'rotate(-90deg)'} 
      animation='spin1 0.3s linear'
    // position="relative"
    // transform={'scaleY(-1)'} 
    >
      <CircularProgress
        position={'absolute'}
        value={percent[0]}
        size={'220px'}
        capIsRound={true}
        color={'#F72585'}
        trackColor={'#493C3C'}
        thickness='8px'
      />
      <CircularProgress
        position={'absolute'}
        value={percent[1]}
        size={'165px'}
        capIsRound={true}
        color={'#000000'}
        trackColor={'#493C3C'}
      // thickness='12px'
      />
      <CircularProgress
        position={'absolute'}
        value={percent[2]}
        size={'110px'}
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'#493C3C'}
        thickness='15px'
      />
      {/* <DoughnutChart
        data={data}
      // onFocus={null}
      /> */}
    </Flex>
  );
}
export default CircularView;