import React, { FunctionComponent, useEffect, useState } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import { MdInfoOutline } from 'react-icons/md';
import Warning from '../../../../assets/Warning.svg'
import { ActionKind, OpenDepositModal, useStore } from '../../../../store';

const Qualifying: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  // const [active, setActive] = useState(false);
  const active = state.qualified;
  
  return (
    <Flex w={'100%'} direction="column" align={'baseline'}>
      <HStack>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          QUALIFYING PHASE STATUS
        </Text>
        <a href="https://near-treasury.gitbook.io/near-treasury-tm/nt-protocol-overview/rewards-plus-program" target={"_blank"} rel="noreferrer">
          <MdInfoOutline />
        </a>
      </HStack>
      <Flex
        w={'93px'}
        mt={'19px'}
        h={'39px'}
        background={active ? '#57A146' : 'red'}
        rounded={'15px'}
        justify={'center'}
        align={'center'}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
        >
          {active ? "ACTIVE" : "OFF"}
        </Text>
      </Flex>
      <HStack
        w={'100%'}
        align={'center'}
        mt={'29px'}
        pl={'29px'}
        pr={'39px'}
        rounded={'15px'}
        border={'solid white 1px'}
        background={'#493C3C'}
        color={'white'}
        spacing={'20px'}
      >
        <Flex w={'15px'}>
          <MdInfoOutline size='15px' />
        </Flex>
        <VStack spacing={'10px'} py={'10px'} align={'baseline'}>
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            IF THE BUTTON IS GREEN, THIS MEANS EVERY DEPOSIT DURING THIS PERIOD QUALIFIES YOU FOR THE MONTHLY REWARDS+ PROGRAM.
          </Text>
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            IF THE BUTTON IS RED, THIS MEANS YOU NEED TO KEEP YOUR BALANCE DEPOSITED TO BECOME ELIGIBLE FOR THE NEXT QUALIFIYNG PHASE.
          </Text>
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            ALL PAYOUTS OF THE REWARDS+ PROGRAM ARE AUTOMATED.
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
}
export default Qualifying;