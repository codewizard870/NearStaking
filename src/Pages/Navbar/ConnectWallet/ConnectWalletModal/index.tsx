import React, { FunctionComponent, useState } from 'react';
import { Stack, VStack, Flex, HStack, Button, Text, Image } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'
import { toast } from 'react-toastify';

import { useStore } from '../../../../store';
import { fetchData, sleep } from '../../../../Util';
import { successOption } from '../../../../constants';
import NearWallet from "../../../../assets/NearWallet.svg";
import SenderWallet from "../../../../assets/SenderWallet.svg";

interface Props {
  isOpen: boolean,
  onClose: () => void,
  connectToNearWallet: () => void,
  connectToSenderWallet: () => void
}
const ConnectWalletModal: FunctionComponent<Props> = ({ 
  isOpen, 
  onClose, 
  connectToNearWallet, 
  connectToSenderWallet
}) => {
  const { state, dispatch } = useStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        background={'#212121'}
        rounded={'25px'}
        w={{ base: '300px', lg: '469px' }}
        minW={{ base: '300px', lg: '469px' }}
        px={'31px'}
        py={'56px'}
      >
        <Flex
          fontSize={'20px'}
          lineHeight={'24px'}
          color={'white'}
          justify={'baseline'}
          direction='column'
        >
          <Text
            fontSize={'24px'}
            fontWeight={'860'}
            color='white'
          >
            Connect Wallet
          </Text>
          <Text
            fontSize={'13px'}
            mt='28px'
            color='#CEBFBF'
          >
            Please select a wallet to connect to this dApp:
          </Text>
          <Stack
            w='100%'
            spacing='15px'
            mt='22px'
            direction={{base:'column', lg:'row'}}
          >
            <VStack
              border="solid 1px #493C3C"
              rounded='10px'
              justify='center'
              align='center'
              w='100%'
              p='17px'
              cursor='pointer'
              onClick={() => connectToNearWallet()}
            >
              <Image src={NearWallet} w='49px' />
              <Text
                fontSize='13px'
                fontWeight='860'
                color='#CEBFBF'
              >
                NEAR Wallet
              </Text>
            </VStack>
            <VStack
              border="solid 1px #493C3C"
              rounded='10px'
              justify='center'
              align='center'
              w='100%'
              p='17px'
              cursor='pointer'
              onClick={() => connectToSenderWallet()}
            >
              <Image src={SenderWallet} w='49px' />
              <Text
                fontSize='13px'
                fontWeight='860'
                color='#CEBFBF'
              >
                Sender
              </Text>
            </VStack>
          </Stack>
        </Flex>
        <ModalCloseButton color={'#CEBFBF'} />
      </ModalContent>
    </Modal>
  );
}
export default ConnectWalletModal;

