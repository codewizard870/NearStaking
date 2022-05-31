import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'

import { MdNorthEast } from 'react-icons/md'

interface Props {
  item: any
}
const HistoryItem: FunctionComponent<Props> = ({ item }) => {

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
              {item.actions[0].kind}
            </Text>
            <HStack spacing={'10px'} >
              <VStack align={'baseline'}>
                <Text
                  fontSize={'13px'}
                  fontWeight={'860'}
                  lineHeight={'15px'}
                >
                  {JSON.stringify(item.actions[0].args).substring(0, 100)}
                </Text>
              </VStack>
              <a href={`${item.blockHash}`} target="_blank" rel="noreferrer">
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
            new Date(item.blockTimestamp).toLocaleString()
          }
        </Text>
      </Flex>
      <Divider orientation='horizontal' />
    </>
  );
}
export default HistoryItem;
