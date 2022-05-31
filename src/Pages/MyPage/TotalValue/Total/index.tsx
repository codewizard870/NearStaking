import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Tooltip, Button } from '@chakra-ui/react'
import {BigNumber} from 'bignumber.js';

import { MdSwapHoriz } from 'react-icons/md'
import { useBalance,  useStore, usePrice } from '../../../../store';
import Warning from "./../../../../assets/Warning.svg"
import AnimationNumber from '../../../Components/AnimationNumber';

interface Props{
  total: BigNumber
}
const Total: FunctionComponent<Props> = ({total}) => {
  const { state, dispatch } = useStore();

  return (
    <HStack justify={"space-between"} w={'100%'} align={'baseline'}>
      <VStack align={'baseline'} w={'100%'} spacing='5px'>
        <HStack align={'baseline'} w={'100%'}>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'20px'}
          >
            TOTAL VALUE
          </Text>
          <Tooltip
            label="Total value of UST/Luna deposits, payed interest, and UST Wallet Balance"
            background={'#C4C4C4'}
            color={'black'} hasArrow
            placement='top-start'
          >
            <Image src={Warning} w={13} />
          </Tooltip>
        </HStack>
        <HStack align={'baseline'} w={'100%'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'35px'}
          >
            <AnimationNumber value={total.toNumber()}/>
          </Text>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            USD
          </Text>
        </HStack>
      </VStack>
      <a href="https://app.terraswap.io/swap?to=&type=swap&from=uluna" target={'_blank'} rel="noreferrer">
        <Button w={'92px'} h={'25px'} background={'none'} rounded={'25px'} borderColor={'white'} variant='outline'>
          <MdSwapHoriz  color='#CEBFBF'/>
          <Text
            fontSize={'9px'}
            fontWeight={'860'}
            lineHeight={'10px'}
            color='#CEBFBF'
          >
            Swap
          </Text>
        </Button>
      </a>
    </HStack>
  );
}
export default Total;