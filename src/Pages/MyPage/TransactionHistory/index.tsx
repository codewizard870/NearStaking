import React, { FunctionComponent, useState, useEffect, useCallback, useMemo } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import * as nearAPI from "near-api-js"
import {getConfig} from "../../../config"

// import {  useInfiniteQuery } from "react-query"
import axios from "axios"

import { useWallet, } from '../../../store';
import HistoryItem from './HistoryItem';

const TransactionHistory: FunctionComponent = (props) => {
  const wallet = useWallet();
  const [list, setList] = useState([]);
  const accountId = wallet?.getAccountId();

  useEffect( ()=> {
    if(!wallet) return;
    const fetchTransaction = async () => {
      try{
        const res = await axios.get(`https://backend-testnet-pr-1008.onrender.com/trpc/transactions-list-by-account-id?batch=1&input={"0":{"accountId":"${accountId}","limit":10}}`);
console.log(res)
        if(res.data.length == 0) return;
        console.log(res.data[0].result.data);
        setList(res.data[0].result.data)
      }
      catch(e){
        console.log(e)
      }
    }
    fetchTransaction();
  }, [wallet] )

  return (
    <VStack
      w={'100%'}
      spacing={'18px'}
      mt='55px'
      align='baseline'
    >
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TRANSACTION HISTORY
      </Text>
      <VStack 
        w={'100%'}
        rounded={'25px'} 
        background={'#212121'} 
        align={'center'}
        spacing={'34px'}
        px={{sm:'10px', md:'20px', lg:'50px'}}
        py={{sm:'10px', md:'20px', lg:'76px'}}
      >
        <VStack w={'100%'}>
          {list.length == 0  &&
            <>
              <Text 
                fontSize='20px'
                fontWeight='800'
                lineHeight={'36px'}
              >
                No transaction History
              </Text>
              <Text 
                fontSize='13px'
                fontWeight='800'
                lineHeight={'13px'}
                color='#CEBFBF'
              >
                Looks like you haven’t made any transactions yet.
              </Text>
            </>
          }
          {list.map((item, index) => (
            <HistoryItem item={item} key={index}/>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
export default TransactionHistory;
