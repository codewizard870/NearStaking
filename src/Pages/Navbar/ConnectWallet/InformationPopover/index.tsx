import React, { FunctionComponent, useEffect, useState } from 'react';
import { VStack, Flex, HStack, Image, Text, Divider, Button } from '@chakra-ui/react'

import {
  PopoverContent,
} from '@chakra-ui/react'
import { MdMail, MdCallMade, MdKeyboardArrowRight } from 'react-icons/md';

import Line from '../../../../assets/Line.svg'
import { shortenAddress, floorNormalize } from '../../../../Util';
import { ActionKind, useStore, useWallet } from '../../../../store';

interface Props {
  isOpen: boolean,
  onClose: () => void,
  connectTo: (to: string) => void,
}
const InformationPopover: FunctionComponent<Props> = ({ isOpen, onClose, connectTo }) => {
  const { state, dispatch } = useStore();
  const wallet = useWallet();

  return (
    <PopoverContent
      rounded={'25px'}
      w={{ sm: '80%', md: '260px', lg: '260x' }}
      minW={{ sm: '80%', md: '260x', lg: '260x' }}
      background={'#493C3C'}
      letterSpacing={'0em'}
      border={'none'}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        w={'100%'}
        direction={'column'}
        px={{ sm: '10px', md: '28px', lg: '28px' }}
        py={'32px'}
      >
        <Flex w={'100%'} justify={'center'} >
          <Text
            fontSize={'9px'}
            fontWeight={'400'}
            lineHeight={'10px'}
            color={'#F9D85E'}
          >
            NEAR WALLET
          </Text>
        </Flex>
        <HStack w={'100%'}>
          <Flex 
            w={'38px'} 
            minW={'38px'} 
            h={'38px'} 
            rounded={'50%'} 
            justify={'center'} 
            align={'center'} 
            background={'#212121'}
          >
            <MdMail />
          </Flex>
          <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
          <Flex 
            w={'38px'} 
            minW={'38px'} 
            h={'38px'} 
            rounded={'50%'} 
            justify={'center'} 
            align={'center'} 
            background={'#212121'}
          >
            <Image src={'./Wnear.svg'} w={'16px'} h={'16px'}/>
          </Flex>
        </HStack>
        <VStack align={'baseline'} w={'100%'}>
          <Text
            mt={'15px'}
            fontSize={'18px'}
            fontWeight={'400'}
            lineHeight={'20px'}
            color={'white'}
          >
            {shortenAddress(wallet?.getAccountId())}
          </Text>
          <Button w={'95px'} h={'21px'} color={'#F9D85E'} background={'#2e2525'} fontSize={'9px'}>
            COPY ADDRESS
          </Button>
        </VStack>
        <Flex direction='column' w={'100%'}  color={'#CEC0C0'} fontSize={'12px'}>
          <Divider mt={'20px'} orientation='horizontal'/>
          <Flex 
            w={'100%'} 
            h={'28px'} 
            rounded={'25px'} 
            background={'#F9D85E'}
            mt='20px'
            justify={'center'}
            align='center'
          >
            <a href={'https://rainbowbridge.app/transfer'} target={'blank'}>
            <Text fontSize={'14px'} color={'white'}>
              RAINBOW BRIDGE
            </Text>
            </a>
          </Flex>
          <Flex 
            w={'100%'} 
            h={'28px'} 
            rounded={'25px'} 
            background={'#F9D85E'}
            mt='20px'
            justify={'center'}
            align='center'
          >
            <a href={'https://www.ref.finance/'} target={'blank'}>
              <Text fontSize={'14px'} color={'white'}>
                SWAP
              </Text>
            </a>
          </Flex>
          <a href={'https://explorer.testnet.near.org/accounts/' + wallet?.getAccountId()} target={'blank'}>
          <HStack mt='10px' justify='center' align='center'>
            <Text>View on Near explorer</Text>
          </HStack>
          </a>
        </Flex>
      </Flex>
      <Flex
        w={'100%'}
        h={'34px'}
        background={'#2e2525'}
        justify={'center'}
        align={'center'}
        rounded={'0 0 25px 25px'}
        _hover={{background:'#3f3434'}}
        cursor={'pointer'}
        onClick={() => {
          onClose();
          // wallet.signOut();
          dispatch({ type: ActionKind.setConnected, payload: false });
        }}
      >
        <Text
          fontSize={'12px'}
          fontWeight={'400'}
          lineHeight={'10px'}
          color={'#CEC0C0'}
        >
          Disconnect
        </Text>
      </Flex>
    </PopoverContent>
  );
}
export default InformationPopover;

