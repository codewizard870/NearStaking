import React, { FunctionComponent, useState } from 'react';
import { Stack, Flex, HStack, Button, Text, Divider } from '@chakra-ui/react'
import * as nearAPI from "near-api-js"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'

import BigNumber from 'bignumber.js';
import Title from './Title';
import InputPanel from './InputPanel';
import SliderWish from './SliderWish';
import Info from './Info';
import { useStore, useWallet } from '../../store';
import { getCoinId } from '../../Util';
import { StableCoins } from '../../constants';
import { CONTRACT_NAME } from '../../config';

interface Props {
  isOpen: boolean,
  onClose: () => void,
}
const DepositModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('0');
  const wallet = useWallet();
  const { state, dispatch } = useStore();
  const coinType = state.coinType;
  const active = state.qualified;

  const deposit = async () => {
    if (wallet == undefined || parseFloat(amount) <= 0)
      return;

    const tokenAddress = StableCoins[getCoinId(coinType)].address!;
    const contract: any = new nearAPI.Contract(
      wallet.account(), // the account object that is connecting
      tokenAddress,
      {
        viewMethods: ["ft_balance_of"],
        changeMethods: ["ft_transfer_call"],
      }
    );

    const decimal = StableCoins[getCoinId(coinType)].decimals;
    let val = new BigNumber(parseFloat(amount)).multipliedBy(10 ** decimal).integerValue();

    let pool_msg = {
      coin: coinType,
      qualified: state.qualified
    };

    let token_msg = {
      receiver_id: CONTRACT_NAME,
      amount: val.toFixed(),
      msg: JSON.stringify(pool_msg)
    }

    window.localStorage.setItem("action", "deposit")
    await contract.ft_transfer_call(token_msg, 300000000000000, 1);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        background={'#212121'}
        rounded={'25px'}
        w={{ sm: '100%', md: '562px', lg: '562px' }}
        minW={{ sm: '100%', md: '562px', lg: '562px' }}
        h={'453px'}
        px={{ sm: '10px', md: '47px', lg: '47px' }}
        py={'39px'}
      >
        <Flex
          fontSize={'20px'}
          lineHeight={'24px'}
          color={'white'}
          justifyContent={'center'}
          alignItems="center"
        >
          <Flex w="8px" h="8px" bg={active? "green" : "red"} rounded="50%" mr="10px"/>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
            mr='17px'
          >
            Deposit
          </Text>
          <Title />
        </Flex>
        <InputPanel amount={amount} setAmount={setAmount} />
        <SliderWish amount={amount} setAmount={setAmount} />
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Info amount={amount} />
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Button
          w={'100%'}
          h={'45px'}
          mt={'26px'}
          background={'#493C3C'}
          rounded={'25px'}
          onClick={() => deposit()}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}

          >
            Proceed
          </Text>
        </Button>
        <ModalCloseButton color={'#CEBFBF'} />
      </ModalContent>
    </Modal>
  );
}
export default DepositModal;

