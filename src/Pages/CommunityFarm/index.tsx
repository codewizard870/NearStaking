import React, { FunctionComponent, useEffect, useState } from 'react';
import { Stack, VStack, Flex, Button } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import * as nearAPI from "near-api-js"

import {BigNumber} from 'bignumber.js';
import { getCoinParam } from '../../Util';
import { CONTRACT_NAME } from '../../config'
import { useStore, useWallet } from '../../store';
import { StableCoins } from '../../constants';

const CommunityFarm: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const [farmInfo, setFarmInfo] = useState<any[]>();
  const wallet = useWallet();
  const coins = StableCoins.filter((coin) => coin.upcoming == false);

  useEffect(() => {
    const fetchData = async () => {
      if (!wallet) return;
      const contract: any = new nearAPI.Contract(
        wallet.account(), // the account object that is connecting
        CONTRACT_NAME,
        {
          viewMethods: ["get_farm_info"],
          changeMethods: ["withdraw_reserve"],
        }
      );
      let res = await contract.get_farm_info();
console.log(res)
      for(let i=0; i<res.length; i++){
        for(let j=0; j<res[i].user_info.length; j++){
          const userInfo = res[i].user_info[j];
          const decimals = StableCoins[j].decimals!;
          userInfo.big_amount = new BigNumber(userInfo.amount + userInfo.reward_amount).dividedBy(10**decimals);
        }
      }
console.log(res);
      const coinParam = getCoinParam("NEARt");
      const decimals = coinParam?.decimals!;
      
      for(let i=0; i<res.length; i++){
        res[i].farm_info.big_amount = new BigNumber(res[i].farm_info.amount).dividedBy(10 ** decimals);
      }
      setFarmInfo(res);
    }
    fetchData();
  }, [wallet])

  return (
    <VStack
      mt={'15px'}
      px={{ sm: '10px', md: '20px', lg: '110px' }}
      w={'100%'}
      spacing={'53px'}
      textColor={'black'}
    >
      <TableContainer>
        <Table variant='simple' colorScheme='yellow' textColor={'white'}>
          <TableCaption>Community Farm</TableCaption>
          <Thead>
            <Tr>
              <Th>AccountId</Th>
              <Th>Amount</Th>
              {coins.map((coin, index) => (
                <Th>{coin.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {farmInfo?.map((item, index) => (
              <Tr>
                <Td>{item.farm_info.account}</Td>
                <Td>{item.farm_info.big_amount.toFixed()}</Td>
                {item.user_info.map((info: any) => (
                  <Td>{info.big_amount.toFixed()}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
export default CommunityFarm;