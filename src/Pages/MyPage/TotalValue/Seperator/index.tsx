import React, { FunctionComponent, useEffect } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Tooltip } from '@chakra-ui/react'
import Warning from "./../../../../assets/Warning.svg"

import BlackPanel from './../../../../assets/BlackPanel.svg'
import YellowPanel from './../../../../assets/YellowPanel.svg'
import PinkPanel from './../../../../assets/PinkPanel.svg'
import BluePanel from './../../../../assets/BluePanel.svg'

import AnimationNumber from '../../../Components/AnimationNumber';
import { StableCoins, DECIMALS } from '../../../../constants';
import { BigNumber } from 'bignumber.js';
import { useBalance, useStore, usePrice } from '../../../../store';
import { floor, floorNormalize, getCoinId } from '../../../../Util';

interface Props{
  total: BigNumber,
  stable: BigNumber,
  volatile: BigNumber,
}
const Seperator: FunctionComponent<Props> = ({total, stable, volatile}) => {
  const { state, dispatch } = useStore();

  return (
    <VStack align={'baseline'} w={'230px'} spacing={'4px'}>
      <HStack spacing={'10px'}>
        <Image src={PinkPanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          Total Balance
        </Text>
        <Tooltip
          label="Total UST Wallet balance"
          background={'#C4C4C4'}
          color={'black'} hasArrow
          placement='top-start'
        >
          <Image src={Warning} />
        </Tooltip>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
        color='#CEBFBF'
      >
        $&nbsp;<AnimationNumber value={total.toNumber()} />
      </Text>
      {/* --------------------------------- */}
      <HStack spacing={'10px'}>
        <Image src={BlackPanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          Stable Balance
        </Text>
        <Tooltip
          label="Total of all UST/Luna deposits, including earnings "
          background={'#C4C4C4'}
          color={'black'} hasArrow
          placement='top-start'
        >
          <Image src={Warning} />
        </Tooltip>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
        color='#CEBFBF'
      >
        $&nbsp;<AnimationNumber value={stable.toNumber()} />
      </Text>
      {/* --------------------------------- */}
      <HStack spacing={'10px'}>
        <Image src={YellowPanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
          whiteSpace='nowrap'
        >
          Volatile Asset Balance
        </Text>
        <Tooltip
          label="Your total UST deposit \n including earnings"
          background={'#C4C4C4'}
          color={'black'} hasArrow
          placement='top-start'
        >
          <Image src={Warning} />
        </Tooltip>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
        color='#CEBFBF'
      >
        $&nbsp;<AnimationNumber value={volatile.toNumber()} />
      </Text>
    </VStack>
  );
}
export default Seperator;