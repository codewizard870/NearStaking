import React, { useState, useEffect, FunctionComponent } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import CountUp from 'react-countup';

interface Props {
  value: number
}
const AnimationNumber: FunctionComponent<Props> = ({ value }) => {
  const [prev, setPrev] = useState(0);
  // const [prevRest, setPrevRest] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPrev(Math.floor(value));
      setLoading(false);
      // setPrevRest(getRest(value));
    }, 1000);
  }, [value])

  function getRest(num: number) {
    return Math.round(num * 100 - Math.floor(num) * 100)
  }

  const tmpValue = value > Number.MAX_VALUE ? Number.MAX_VALUE : value;
  const bigValue = new BigNumber(value);
  const rest = getRest(value) < 10 ? ".0" + getRest(value).toString() : "." + getRest(value).toString();
  
  // BigNumber.config({ ROUNDING_MODE: 0 })
  // BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP })
  // BigNumber.config({ DECIMAL_PLACES: 5 })
  // BigNumber.ROUND_FLOOR
  return (
    <span>
      {loading && <CountUp start={prev} end={Math.floor(tmpValue)} separator=',' />}
      {loading && getRest(value) > 0 ? `${rest}` : "" }
      {!loading && bigValue.decimalPlaces(2, BigNumber.ROUND_FLOOR).toFixed()}
    </span>
  )
}

export default AnimationNumber;