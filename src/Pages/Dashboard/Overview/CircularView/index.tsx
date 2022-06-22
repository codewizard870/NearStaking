import React, { FunctionComponent, useEffect, useState } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js';

import { DoughnutChart } from "./DoughnutChart";
import { StableCoins } from '../../../../constants';
import { useStore, usePrice } from '../../../../store';

const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const [percent, setPercent] = useState(0);
  const history = state.amountHistory;
  const price = state.price;
  const last = history.length - 1;

  let stable = new BigNumber(0);
  let volatile = new BigNumber(0);
  let sum = new BigNumber(0);

  if (last > 0) {
    let coins = StableCoins.filter((coin) => !coin.upcoming);
    for (let j = 0; j < coins.length; j++) {
      let usd = new BigNumber(history[last].amount[j] + history[last].reward[j]);
      usd = usd.multipliedBy(price[j]).dividedBy(10 ** StableCoins[j].decimals);

      if (coins[j].stable)
        stable = stable.plus(usd);
      else
        volatile = volatile.plus(usd);
    }
    sum = stable.plus(volatile);
  }
  useEffect(() => {
    // function animateValue(start: number, end: number, duration: number) {
    //   if (start >= end) return;
    //   var range = end - start;
    //   var current = start;
    //   var increment = end > start ? 1 : -1;
    //   var stepTime = Math.abs(Math.floor(duration / range));

    //   var timer = setInterval(function () {
    //     current += increment;

    //     setPercent(current);
    //     if (current >= end) {
    //       clearInterval(timer);
    //     }
    //   }, stepTime);
    // }

    if (!sum.eq(0)) {
      let percent_big = stable.dividedBy(sum).multipliedBy(100);
      setPercent(percent_big.toNumber() * 0.95);
      // animateValue(0, percent_big.toNumber(), 1000);
    } else {
      setPercent(75);
    }
  }, [sum]);
  return (
    <Flex
      transform={'rotate(-90deg)'}
    // animation='spin 0.3s linear'
    >
      <CircularProgress
        value={percent}
        size={'172px'}
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'black'}
        thickness='14'
        // aria-busy={false}
      />
      {/* <DoughnutChart 
        descriptors = {[
          {
            label: "www",
            color: "black",
            value: percent,
          },
          {
            label: "www",
            color: "#F9D85E",
            value: 100-percent,
          }
        ]}
      /> */}
    </Flex>
  );
}
export default CircularView;