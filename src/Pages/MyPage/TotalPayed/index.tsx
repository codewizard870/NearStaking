import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Tooltip, Button } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js';

import Warning from "./../../../assets/Warning.svg";
import { StableCoins, DECIMALS } from '../../../constants';
import AnimationNumber from '../../Components/AnimationNumber';
import { OpenDepositModal, useStore, usePrice } from '../../../store';
import { floorNormalize, floor } from '../../../Util';

const TotalPayed: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let total = new BigNumber(0);

  let depositTime_max = 0;
  for (let i = 0; i < coins.length; i++) {
    let amount = new BigNumber(state.userInfos[i].reward_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** DECIMALS[i]);
    total = total.plus(amount);

    if (depositTime_max == 0 || depositTime_max < state.userInfos[i].deposit_time)
      depositTime_max = state.userInfos[i].deposit_time;
  }

  const period = depositTime_max > 0 ? Date.now() * 10**6 - depositTime_max : 0;
  const day = Math.floor((period > 0 ? period : 0) /10**9 / 60 / 60 / 24);

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      rounded={'25px'}
      background={'#212121'}
      align={'baseline'}
      px={{ sm: '10px', md: '20px', lg: '50px' }}
      py={{ sm: '10px', md: '20px', lg: '60px' }}
    >
      <Tooltip
        label="Total payed interest of your UST/Luna Deposits calculated in UST"
        background={'#C4C4C4'}
        color={'black'} hasArrow
        placement='top-start'
      >
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'20px'}
        >
          TOTAL PAYED INTEREST
        </Text>
      </Tooltip>
      <HStack mt={'6px'} spacing={'10px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'34px'}
        >
          <AnimationNumber value={total.toNumber()} />
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          USD
        </Text>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        lineHeight={'14px'}
        fontStyle={'italic'}
        color='#CEBFBF'
      >
        USD $<AnimationNumber value={total.toNumber()} />
      </Text>
      <HStack mt={'31px'} spacing={'20px'} align={'baseline'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'20px'}
        >
          TOTAL DAYS STAKED
        </Text>
        <Tooltip
          label="Total days staked with no withdraw"
          background={'#C4C4C4'} hasArrow
          placement='top-start'
          color={'black'}
        >
          <Image src={Warning} w={'13px'} />
        </Tooltip>
      </HStack>
      <HStack mt={'10px'} spacing={'10px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          <AnimationNumber value={day} />
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          DAYS
        </Text>
      </HStack>
      <Button
        w={'100%'}
        mt={'65px'}
        h={'45px'}
        background={'#493C3C'}
        rounded={'25px'}
        onClick={() => {
          if (state.connected && state.openDepositModal)
            state.openDepositModal()
          else if (!state.connected && state.openConnectWalletModal)
            state.openConnectWalletModal()
        }}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
        >
          {!state.connected &&
            "Connect Wallet"
          }
          {state.connected &&
            "SAVE MORE"
          }
        </Text>
      </Button>
    </Flex>
  );
}
export default TotalPayed;