import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem, Tooltip } from '@chakra-ui/react'
import { BigNumber } from 'bignumber.js'

import {
  OpenDepositModal,
  OpenWithdrawModal,
  useStore,
  COINTYPE,
  useDeposited
} from '../../../store';
import { DECIMALS } from '../../../constants';
import AnimationNumber from '../../Components/AnimationNumber';
import { floor, floorNormalize, getCoinId } from '../../../Util';

interface Props {
  name: COINTYPE,
  description: string,
  avatar: string,
  apr: number,
}
const CoinItem: FunctionComponent<Props> = ({ name, description, avatar, apr }) => {
  const { state, dispatch } = useStore();

  const history = state.amountHistory;
  const last = history.length - 1;
  const coinId = getCoinId(name)
  const price = state.price;

  const tvl_coin = last < 0 ? new BigNumber(0) : new BigNumber(history[last].amount[coinId]).dividedBy(10 ** DECIMALS[coinId]);
  const tvl_usd = last < 0 ? new BigNumber(0) : tvl_coin.multipliedBy(price[coinId]);

  return (
    <>
      <GridItem w={'100%'} h={'100px'}>
        <HStack
          w={'100%'}
          h={'100%'}
          spacing={'27px'}
          align={'center'}
          justify={'left'}
          display={{ sm: 'none', md: 'none', lg: 'flex' }}
        >
          <Flex w='33px'>
            <Image src={'./' + avatar} w={'33px'} />
          </Flex>
          <VStack align={'baseline'} spacing={'0px'}>
            <Text
              fontSize={'20px'}
              fontWeight={'800'}
              color={'white'}
              lineHeight='20px'
            >
              {name}
            </Text>
            <Text
              fontSize={'13px'}
              fontWeight={'400'}
              lineHeight='13px'
            >
              {description}
            </Text>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem w={'100%'} h={'100px'}>
        <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
          <Text
            fontSize={'13px'}
            fontWeight={'400'}
            lineHeight={'15.6px'}
          >
            <AnimationNumber value={apr} />%
          </Text>
        </Flex>
      </GridItem>
      <GridItem w={'100%'} h={'100px'}>
        <VStack w={'100%'} h={'100%'} align={'center'} justify={'center'} >
          <Text
            fontSize={'13px'}
            fontWeight={'400'}
            lineHeight={'15.6px'}
          >
            <AnimationNumber value={tvl_coin.toNumber()} /> {name}
          </Text>
          <Text
            fontSize={'13px'}
            fontWeight={'400'}
            lineHeight={'15.6px'}
          >
            <AnimationNumber value={tvl_usd.toNumber()} /> USD Value
          </Text>
        </VStack>
      </GridItem>
      <GridItem w={'100%'} h={'100px'}>
        <Stack
          direction={{ sm: 'column', md: 'column', lg: 'row' }}
          w={'100%'}
          h={'100%'}
          align={'center'}
          justify={'center'}
          spacing={'15px'}
        >
          <Button
            w={'134px'}
            h={'30px'}
            background={'#493C3C'}
            rounded={'25px'}
            onClick={() => {
              if (state.connected)
                OpenDepositModal(state, dispatch, name)
              else if (state.openConnectWalletModal != undefined)
                state.openConnectWalletModal();
            }}
          >
            <Text
              fontSize={'9px'}
              fontWeight={'800'}
              lineHeight={'10.8px'}
              color={'white'}
            >
              {state.connected &&
                "Deposit"
              }
              {!state.connected &&
                "Connect Wallet"
              }
            </Text>
          </Button>
          <Button
            w={'134px'}
            h={'30px'}
            background={'#212121'}
            rounded={'25px'}
            border={'solid 1px #CEBFBF'}
            onClick={() => {
              if (state.connected)
                OpenWithdrawModal(state, dispatch, name)
              else if (state.openConnectWalletModal != undefined)
                state.openConnectWalletModal();
            }}
          >
            <Text
              fontSize={'9px'}
              fontWeight={'800'}
              lineHeight={'10px'}
              color={'#CEBFBF'}
            >
              {state.connected &&
                "Withdraw"
              }
              {!state.connected &&
                "Connect Wallet"
              }
            </Text>
          </Button>
        </Stack>
      </GridItem>
      <GridItem colSpan={4}>
        <Divider orientation={'horizontal'} borderColor='#434040' />
      </GridItem>
    </>
  );
}
export default CoinItem;