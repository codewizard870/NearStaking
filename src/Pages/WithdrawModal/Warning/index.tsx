import React, { FunctionComponent, useState } from 'react';
import { Stack, VStack, Flex, HStack, Button, Text, Divider, Link, Checkbox } from '@chakra-ui/react'
import * as nearAPI from "near-api-js"
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { MdWarningAmber, MdInfoOutline } from 'react-icons/md'

import BigNumber from 'bignumber.js';
import { CONTRACT_NAME } from '../../../config'
import { useStore, useWallet, ActionKind } from '../../../store';
import { fetchData, sleep, getCoinId } from '../../../Util';
import { successOption, errorOption, REQUEST_ENDPOINT, StableCoins } from '../../../constants';
import CustomCheckbox from './CustomCheckbox';

interface Props {
  isOpen: boolean,
  onClose: () => void,
  onCloseParent: () => void,
  amount: string,
}
const WarningModal: FunctionComponent<Props> = ({ isOpen, onClose, amount, onCloseParent }) => {
  const [checked, setChecked] = useState(false);
  const { state, dispatch } = useStore();
  const wallet = useWallet();
  const coinType = state.coinType;

  const withdraw = async () => {
    if (checked == false || wallet == undefined || parseFloat(amount) <= 0)
      return;

    const contract: any = new nearAPI.Contract(
      wallet.account(), // the account object that is connecting
      CONTRACT_NAME,
      {
        viewMethods: ["view_status"],
        changeMethods: ["withdraw_reserve"],
      }
    );

    const decimal = StableCoins[getCoinId(state.coinType)].decimals;
    let val = new BigNumber(amount).multipliedBy(10 ** decimal).integerValue(BigNumber.ROUND_DOWN);

    let withdraw_msg = {
      coin: coinType,
      amount: val.toFixed(),
    }

    window.localStorage.setItem("action", "withdraw");
    window.localStorage.setItem("coinType", coinType);
    window.localStorage.setItem("amount", val.toFixed());
    await contract.withdraw_reserve(withdraw_msg, 300000000000000, 1);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        background={'#212121'}
        rounded={'25px'}
        w={{ sm: '80%', md: '562px', lg: '562px' }}
        minW={{ sm: '80%', md: '562px', lg: '562px' }}
        h={'413px'}
        px={{ sm: '10px', md: '47px', lg: '47px' }}
        py={'39px'}
      >
        <HStack
          color={'white'}
          justifyContent={'center'}
          mx={'100px'}
          spacing={'8px'}
        >
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'20px'}
          >
            WITHDRAW WARNING
          </Text>
          <MdWarningAmber size={20} />
        </HStack>
        <VStack
          mt={'46px'}
          background={'#493C3C'}
          px={'20px'}
          py={'25px'}
          align={'baseline'}
          rounded={'15px'}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
            color={'#CEBFBF'}
          >
            Are you really sure you want to withdraw?
            You may lose your valuable share of the Community Farming Event and your eligibility for the Rewards+ Program.
          </Text>
          <Link
            href="https://near-treasury.gitbook.io/near-treasury-tm/near-treasury-tm/home"
            target="_blank"
            _focus={{ boxshadow: 'none' }}
          >
            <HStack color={'#F9D85E'}>

              <Text
                fontSize={'13px'}
                fontWeight={'700'}
                lineHeight={'13px'}
              >
                Learn more about your benefits
              </Text>
              <MdInfoOutline />

            </HStack>
          </Link>
        </VStack>
        <Divider mt={'47px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Stack mt={'34px'}
          direction={{ sm: 'column', md: 'row', lg: 'row' }}
          spacing={'35px'}
        >
          <HStack>
            <CustomCheckbox checked={checked} setChecked={setChecked} />
            <Text
              fontSize={'9px'}
              fontWeight={'400'}
              lineHeight={'11px'}
              color={'#CEC0C0'}
              w={{ sm: '100%', md: '118px', lg: '118px' }}
            >
              Please check the box if you understand that you are losing your benefits
            </Text>
          </HStack>
          <Button
            w={'100%'}
            h={'45px'}
            background={'#493C3C'}
            rounded={'25px'}
            onClick={() => withdraw()}
          >
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
              color={'white'}
            >
              YES, I WANT TO LOOSE MY BENEFITS!
            </Text>
          </Button>
        </Stack>
        <ModalCloseButton color={'#CEBFBF'} />
      </ModalContent>
    </Modal>
  );
}
export default WarningModal;

