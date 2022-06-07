import React, { FunctionComponent, useState, useMemo, useEffect } from 'react';
import { Flex, Text, Button, Image, Spinner, useDisclosure } from '@chakra-ui/react'
import { Popover, PopoverTrigger } from '@chakra-ui/react'

import "regenerator-runtime/runtime";
import * as nearAPI from "near-api-js"
import {getConfig, CONTRACT_NAME} from "../../../config"

import { toast } from 'react-toastify';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

import Wallet from './../../../assets/Wallet.svg';
import InformationPopover from './InformationPopover';
import ConnectWalletModal from './ConnectWalletModal';
import { useStore, ActionKind } from '../../../store';
import { shortenAddress, floorNormalize, floor } from '../../../Util';

declare let window: any;
const nearConfig = getConfig("testnet");

const ConnectWallet: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const [bank, setBank] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [access, setAccess] = useState({});

  const { isOpen: isOpenInfomation,
    onOpen: onOpenInfomation,
    onClose: onCloseInfomation } = useDisclosure();

  const { isOpen: isOpenConnectWallet,
    onOpen: onOpenConnectWallet,
    onClose: onCloseConnectWallet } = useDisclosure();

  useEffect(() => {
    dispatch({ type: ActionKind.setOpenConnectWalletModal, payload: onOpenConnectWallet });
  }, [dispatch, onOpenConnectWallet])
  
  useEffect(() => {
    async function fetchBalance() {
      if (state.walletType == 'near' && state.wallet) {
        const account = state.wallet.account();
        let accountId = state.wallet.getAccountId();
        setAddress(accountId);

        const balance = await account.getAccountBalance();
        const { utils } = nearAPI;
        const amountInNEAR = utils.format.formatNearAmount(balance.available);

        setBank(true);

        const amount = floor(parseFloat(amountInNEAR));
        setBalance(amount.toString());
        dispatch({ type: ActionKind.setNearBalance, payload: amount});
      }
    }
console.log(state.connected)
    if (state.connected && state.wallet) {
      fetchBalance()
    }
  }, [state.connected, state.wallet, dispatch, state.loading, state.walletType])

  function connectTo() {
    onOpenConnectWallet();
  }

  async function connectToNearWallet() {
    window.localStorage.setItem("wallet", "near");

    dispatch({ type: ActionKind.setWalletType, payload: 'near' });
    onCloseConnectWallet();

    const near = await nearAPI.connect(
      Object.assign(
        { deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } },
        nearConfig)
    );

    const wallet = new nearAPI.WalletAccount(near, null);
    let signed = wallet.isSignedIn();

    if (!signed) {
      dispatch({ type: ActionKind.setConnected, payload: false });
      dispatch({ type: ActionKind.setWallet, payload: undefined });

      wallet.requestSignIn(
        // The contract name that would be authorized to be called by the user's account.
        CONTRACT_NAME,
        // This is the app name. It can be anything.
        'Who was the last person to say "Hi!"?',
        // We can also provide URLs to redirect on success and failure.
        // The current URL is used by default.
      );
    } else {
      dispatch({ type: ActionKind.setNear, payload: near});
      dispatch({ type: ActionKind.setConnected, payload: true });
      dispatch({ type: ActionKind.setWallet, payload: wallet });
    }
  }

  async function connectToSenderWallet() {
    try {
      // The method names on the contract that should be allowed to be called. Pass null for no method names and '' or [] for any method names.
      // const res = await window.near.requestSignIn({ contractId, methodNames: ['sayHi', 'ad'] })
      // const res = await window.near.requestSignIn({ contractId, methodNames: null })
      const res = await window.near.requestSignIn({ CONTRACT_NAME, methodNames: [] })
      // const res = await window.near.requestSignIn({ contractId, amount: '10000000000000000000000' })
      console.log('signin res: ', res);
      if (!res.error) {
        if (res && res.accessKey) {
          setAccess(res.accessKey);
          setAddress(window.near.accountId)
        } else {
          console.log('res: ', res)
        }
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <>
      {!state.connected &&
        <Button
          width={'171px'}
          height={'27px'}
          background={'none'}
          border={'solid 2px #F9D85E'}
          rounded={'25px'}
          onClick={() => { connectTo() }}
        >
          <Image src={Wallet} width={'13px'} />
          <Text 
            ml={'11px'} 
            color={'#F9D85E'}
            fontSize={'11px'}
            fontWeight={'600'}
          >
            Connect Wallet
          </Text>
        </Button>
      }
      {state.connected &&
        <Popover isOpen={isOpenInfomation} onClose={onCloseInfomation}>
          <PopoverTrigger>
            <Button
              fontSize={'15px'}
              fontWeight={'700'}
              // width={'171px'}
              height={'27px'}
              background={'none'}
              border={'solid 2px #F9D85E'}
              rounded={'25px'}
              onClick={() => { onOpenInfomation() }}
            >
              {(bank && !state.loading) &&
                <MdOutlineAccountBalanceWallet size={25} color={'#F9D85E'} />
              }
              {(!bank || state.loading) &&
                <Spinner color={'#F9D85E'} />
              }
              <Text ml={'15px'} color={'#F9D85E'}>
                {shortenAddress(address.toString())}
                &nbsp;|&nbsp;
                {balance}&nbsp;NEAR
              </Text>
            </Button>
          </PopoverTrigger>
          <InformationPopover isOpen={isOpenInfomation} onClose={onCloseInfomation} connectTo={connectTo} />
        </Popover>
      }
      <ConnectWalletModal
        isOpen={isOpenConnectWallet}
        onClose={onCloseConnectWallet}
        connectToNearWallet={connectToNearWallet}
        connectToSenderWallet={connectToSenderWallet}
      />
    </>
  );
}

export default ConnectWallet;