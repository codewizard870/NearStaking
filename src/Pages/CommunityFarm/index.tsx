import React, { FunctionComponent, useEffect, useState } from 'react';
import { Stack, VStack, Flex, Button } from '@chakra-ui/react'
import * as nearAPI from "near-api-js"

import { CONTRACT_NAME } from '../../config'
import { useStore, useWallet } from '../../store';
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
} from '@chakra-ui/react'

const CommunityFarm: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const [farmInfo, setFarmInfo] = useState<any[]>();
  const wallet = useWallet();

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
              <Th>Wallet</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {farmInfo?.map((item, index) => (
              <Tr>
                <Td>{item.account}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
export default CommunityFarm;