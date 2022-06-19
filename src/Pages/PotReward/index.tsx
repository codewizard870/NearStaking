import React, { FunctionComponent, useEffect, useState } from 'react';
import { Stack, VStack, Flex, Button } from '@chakra-ui/react';
import * as nearAPI from "near-api-js";
import { BigNumber } from 'bignumber.js';

import { StableCoins } from '../../constants';
import { CONTRACT_NAME } from '../../config'
import { floorNormalize } from '../../Util';
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

const PotReward: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const [potInfo, setPotInfo] = useState<any[]>();
  const wallet = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      if (!wallet) return;
      const contract: any = new nearAPI.Contract(
        wallet.account(), // the account object that is connecting
        CONTRACT_NAME,
        {
          viewMethods: ["get_pot_info"],
          changeMethods: ["withdraw_reserve"],
        }
      );
      let res = await contract.get_pot_info();
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].length; j++) {
          res[i][j].big_amount = new BigNumber(res[i][j].amount).dividedBy(10 ** StableCoins[j].decimals);
          res[i][j].big_qualified_amount = new BigNumber(res[i][j].qualified_amount).dividedBy(10 ** StableCoins[j].decimals);
        }
      }
      setPotInfo(res)
    }

    fetchData();
  }, [wallet])

  const coins = StableCoins.filter((coin) => coin.upcoming == false);

  return (
    <VStack
      mt={'15px'}
      px={{ sm: '10px', md: '20px', lg: '110px' }}
      w={'100%'}
      spacing={'53px'}
      textColor={'black'}
    >
      <TableContainer>
        <Table variant='simple' colorScheme='yellow' textColor={'white'} w='100%'>
          <TableCaption>Monthly Reward</TableCaption>
          <Thead>
            <Tr>
              <Th>Wallet</Th>
              {coins.map((coin, index) => (
                <>
                  <Th>{coin.name} Amount</Th>
                  <Th>Qualified {coin.name} Amount</Th>
                </>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {potInfo?.map((item, index) => (
              <Tr>
                <Td>{item[0].account}</Td>
                {item.map((coin: any) => (
                  <>
                    <Td>{coin.big_amount.toFormat()}</Td>
                    <Td>{coin.big_qualified_amount.toFormat()}</Td>
                  </>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
export default PotReward;