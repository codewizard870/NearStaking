import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Tooltip, Link, Divider, Button } from '@chakra-ui/react'
import {BigNumber} from 'bignumber.js';

import AnimationNumber from '../../../Components/AnimationNumber';
import { MdInfoOutline } from 'react-icons/md';
import Warning from '../../../../assets/Warning.svg'
import { StableCoins } from '../../../../constants';
import { OpenDepositModal, useStore, usePrice } from '../../../../store';

const Left: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  let total = new BigNumber(0);

  for (let i = 0; i < coins.length; i++) {
    let amount = new BigNumber(state.potInfo[i].qualified_amount);
    amount = amount.multipliedBy(state.price[i]).dividedBy(10 ** coins[i].decimals);
    total = total.plus(amount);
  }

  return (
    <Flex w={'100%'} direction="column">
      <HStack>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          NEAR TREASURY REWARDS PLUS PROGRAM 
        </Text>
        <a href="https://near-treasury.gitbook.io/near-treasury-tm/nt-protocol-overview/rewards-plus-program" target={"_blank"} rel="noreferrer">
          <MdInfoOutline />
        </a>
      </HStack>
      <HStack w={'100%'} align={'baseline'} mt={'88px'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          YOUR QUALIFIED DEPOSIT VALUE
        </Text>
        <Tooltip 
          label="The total of your qualified deposits" 
          background={'#C4C4C4'} hasArrow 
          placement='top-start' 
          color={'black'}
        > 
          <Image src={Warning} w={'13px'}/>
        </Tooltip>
      </HStack>
      <HStack w={'100%'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          <AnimationNumber value={total.toNumber()} />
        </Text>
        <Text
          fontSize={'25px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
           USD
        </Text>
      </HStack>
      <Link href="/mypage#mypage_deposit">
        <Button 
          w={'350px'} 
          mt={'29px'} 
          h={'45px'} 
          background={'#493C3C'} 
          rounded={'25px'}
          // onClick = {() => OpenDepositModal(state, dispatch, "USDC")}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            STAKE NOW
          </Text>
        </Button>
      </Link>
    </Flex>
);
}
export default Left;