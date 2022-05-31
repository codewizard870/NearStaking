import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Link, Tooltip } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js'

import BlackPanel from '../../../../assets/BlackPanel.svg'
import YellowPanel from '../../../../assets/YellowPanel.svg'
import { useStore, usePrice } from '../../../../store';
import AnimationNumber from '../../../Components/AnimationNumber';
import { floor, floorNormalize } from '../../../../Util';
import { StableCoins, DECIMALS } from '../../../../constants';

const ValueView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();

  const history = state.amountHistory;
  const price = state.price;
  const last = history.length - 1;

  let stable = new BigNumber(0);
  let volatile = new BigNumber(0);

  if (last > 0) {
    let coins = StableCoins.filter((coin) => !coin.upcoming);
    for (let j = 0; j < coins.length; j++) {
      let usd = new BigNumber(history[last].amount[j] + history[last].reward[j]);
      usd = usd.multipliedBy(price[j]).dividedBy(10 ** DECIMALS[j]);

      if (coins[j].stable)
        stable = stable.plus(usd);
      else
        volatile = volatile.plus(usd);
    }
  }
  
  return (
    <VStack mt='28px' spacing={'30px'} alignItems={'baseline'}>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={YellowPanel} w={'15px'} />
          <Tooltip
            label="Total deposited LUNA & compounded interest Calculated in UST"
            background={'#C4C4C4'}
            color={'black'} hasArrow
            placement='top-start'
          >
            <Text
              fontSize={'20px'}
              fontWeight={'800'}
              lineHeight={'24px'}
              whiteSpace='nowrap'
            >
              STABLE COINS
            </Text>
          </Tooltip>
        </HStack>
        <Text
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'15px'}
          fontStyle={'italic'}
          color='#CEBFBF'
        >
          $&nbsp;<AnimationNumber value={stable.toNumber()} />
        </Text>
      </VStack>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={BlackPanel} w={'15px'} />
          <Tooltip
            label="Total deposited UST & compounded interest"
            background={'#C4C4C4'} hasArrow
            placement='top-start'
            color={'black'}
          >
            <Text
              fontSize={'20px'}
              fontWeight={'800'}
              lineHeight={'24px'}
              whiteSpace='nowrap'
            >
              VOLATILE COINS
            </Text>
          </Tooltip>
        </HStack>
        <Text
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'15px'}
          fontStyle={'italic'}
          color='#CEBFBF'
        >
          $&nbsp;<AnimationNumber value={volatile.toNumber()} />
        </Text>
      </VStack>
    </VStack>
  );
}
export default ValueView;