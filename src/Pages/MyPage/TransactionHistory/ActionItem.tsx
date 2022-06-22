import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'

import { getCoinId } from '../../../Util';
import { CONTRACT_NAME } from '../../../config';
import { MdNorthEast } from 'react-icons/md'
import { useWallet } from '../../../store';
import { StableCoins } from '../../../constants';
import BigNumber from 'bignumber.js';

interface Props {
  action: any,
  receiverId: string,
  signerId: string,
  blockTimestamp: number,
  blockHash: string
}
const ActionItem: FunctionComponent<Props> = ({ action, receiverId, signerId, blockTimestamp, blockHash }) => {
  const account = useWallet().getAccountId();
  let title, msg;

  switch(action.kind){
    case "CreateAccount":
      title = "New account created";
      msg = "account " + receiverId;
      break;
    case "Transfer":
      // const args1 = JSON.parse(atob(action.args.args));
      const value = new BigNumber(action.args.deposit).dividedBy(10 ** 24);
      if(receiverId == account){
        title = "Received NEAR";
        msg = value.toFixed() + " from " + signerId;
      } else {
        title = "Transfer NEAR";
        msg = value.toFixed() + " to " + receiverId;
      }
      break;
    case "AddKey":
      title = "Access Key added";
      msg = "for " + receiverId;
      break;
    case "FunctionCall":
      const args = JSON.parse(atob(action.args.args));

      title = "Method called";
      if(receiverId == CONTRACT_NAME && action.args.method_name == "withdraw_reserve"){
        const decimals = StableCoins[getCoinId(args.coin)].decimals;
        const amount = new BigNumber(args.amount).dividedBy(10**decimals);
        msg = `Withdraw ${args.coin} ${amount.toFixed()}`
      }
      else if(action.args.method_name == "ft_transfer_call" && args.receiver_id == CONTRACT_NAME) {
        const param = JSON.parse(args.msg)
        const decimals = StableCoins[getCoinId(param.coin)].decimals;
        const amount = new BigNumber(args.amount).dividedBy(10**decimals);
        msg = `Deposit ${param.coin} ${amount.toFixed()}`
      }
      else {
        msg = action.args.method_name + " in contract: " + receiverId;
      }
  }
  return (
    <>
      <Flex
        w={'100%'}
        justify={'space-between'}
        align={'center'}
      >
        <VStack align={'baseline'}>
          <Flex w={'100%'} direction={'column'}>
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
            >
              {/* {action.kind} */}
              {title}
            </Text>
            <HStack spacing={'10px'} >
              <VStack align={'baseline'}>
                <Text
                  fontSize={'13px'}
                  fontWeight={'860'}
                  lineHeight={'15px'}
                >
                  {/* {JSON.stringify(action.args).substring(0, 100)} */}
                  {msg}
                </Text>
              </VStack>
              <a href={`https://explorer.testnet.near.org/blocks/${blockHash}`} target="_blank" rel="noreferrer">
                <MdNorthEast />
              </a>
            </HStack>
          </Flex>
        </VStack>
        <Text
          fontSize={'10px'}
          fontWeight={'860'}
          lineHeight={'12px'}
        >
          {
            new Date(blockTimestamp).toLocaleString()
          }
        </Text>
      </Flex>
      <Divider orientation='horizontal' />
    </>
  );
}
export default ActionItem;
