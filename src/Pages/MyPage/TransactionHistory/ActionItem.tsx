import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'

import { MdNorthEast } from 'react-icons/md'
import { useWallet } from '../../../store';

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
      if(receiverId == account){
        title = "Received NEAR";
        msg = "from " + signerId;
      } else {
        title = "Transfer NEAR";
        msg = "to " + receiverId;
      }
      break;
    case "AddKey":
      title = "Access Key added";
      msg = "for " + receiverId;
      break;
    case "FunctionCall":
      title = "Method called";
      msg = action.args.method_name + " in contract: " + receiverId;
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
