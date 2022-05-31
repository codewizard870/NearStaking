import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem, Tooltip } from '@chakra-ui/react'


import {
  useStore,
  usePrice,
  COINTYPE
} from '../../../store';
import { StableCoins } from '../../../constants';
import { floor, floorNormalize } from '../../../Util';
import CoinItem from './CoinItem';

const CoinPanel: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const rate = usePrice();

  const lunaDeposited = 0;
  const amount = lunaDeposited * rate;

  return (
    <VStack
      w={'100%'}
      rounded={'25px'}
      background={'#212121'}
      align={'center'}
      spacing={'34px'}
      color={'#CEC0C0'}
      px={{ sm: '10px', md: '20px', lg: '50px' }}
      pt={{ sm: '10px', md: '20px', lg: '29px' }}
      pb={{ sm: '10px', md: '20px', lg: '60px' }}
    >
      <Grid
        templateColumns="15% 25% 25% auto"
        gap={0}
        w={'100%'}
      >
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'800'}
              lineHeight={'15px'}
            >
              Name
            </Text>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Tooltip
              label="Current annualized deposit rate"
              background={'#C4C4C4'} hasArrow
              placement='top-start'
              color={'black'}
            >
              <Text
                fontSize={'13px'}
                fontWeight={'800'}
                lineHeight={'15px'}
              >
                APY
              </Text>
            </Tooltip>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Tooltip
              label="Total of all LUNA deposits including earnings "
              background={'#C4C4C4'} hasArrow
              placement='top-start'
              color={'black'}
            >
              <Text
                fontSize={'13px'}
                fontWeight={'800'}
                lineHeight={'15px'}
              >
                TVL
              </Text>
            </Tooltip>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'800'}
              lineHeight={'15px'}
            >
              Actions
            </Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={4}>
          <Divider orientation={'horizontal'} borderColor='#434040'/>
        </GridItem>
        {StableCoins.map((item)=> (
          item.upcoming === false && 
          <CoinItem 
            name={item.name as COINTYPE}
            description={item.description}
            avatar={item.avatar}
            apr={item.apr}
          />
        ))}
      </Grid>
    </VStack>
  );
}
export default CoinPanel;