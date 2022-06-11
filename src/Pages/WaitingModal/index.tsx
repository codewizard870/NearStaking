import React, { FunctionComponent, useState } from 'react';
import { Stack, Flex, HStack, Button, Text, Divider, Image, Link } from '@chakra-ui/react'
import { Deposit, MsgExecuteContract, WasmAPI, Coin } from '@terra-money/terra.js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import Neart from '../../assets/Neart.svg';
import { shortenAddress } from '../../Util';
import { useStore } from '../../store';

interface Props {
  isOpen: boolean,
  onClose: () => void,
}
const WaitingModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useStore();
  const txhash = state.txhash;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        background={'#212121'}
        rounded={'25px'}
        w={{ base: '80%', md: '469px', lg: '469px' }}
        minW={{ sm: '80%', md: '469px', lg: '469px' }}
        h={'314px'}
        px={{ sm: '10px', md: '45px', lg: '45px' }}
        pt={{ base: '10px', lg: '59px' }}
        pb={{ base: '10px', lg: '39px' }}
        alignItems={'center'}
      >
        <Image src={Neart} h='60px' animation="fadein 3s infinite"/>
        <Text
          mt={'30px'}
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
          color={'white'}
        >
          Waiting for Near Wallet...
        </Text>
        <Text
          mt={'20px'}
          fontSize={'9px'}
          fontWeight={'400'}
          lineHeight={'11px'}
          color={'#CEC0C0'}
        >
          Transaction broadcasted. There is no need to send another until it has been completed.
        </Text>
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <HStack mt={'23px'} w={'100%'} justify={'space-between'}>
          <Text
            fontSize={'9px'}
            fontWeight={'400'}
            lineHeight={'11px'}
            color={'#CEC0C0'}
          >
            Tx Hash
          </Text>
          <Link
            href={`https://explorer.testnet.near.org/transactions/${txhash}`}
            target="_blank"
            rel="noreferrer"
            _focus={{ boxShadow: 'none' }}
          >
            <Text
              fontSize={'13px'}
              fontWeight={'400'}
              lineHeight={'14px'}
              color={'#CEC0C0'}
            >
              {shortenAddress(txhash)}
            </Text>
          </Link>
        </HStack>
        <ModalCloseButton color={'#CEBFBF'} />
      </ModalContent>
    </Modal>
  );
}
export default WaitingModal;

