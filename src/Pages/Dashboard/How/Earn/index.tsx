import React, { useState, FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Box, Button, Input, Divider, Slider, SliderTrack, SliderThumb } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";
import { MdCode, MdArrowDropDownCircle } from "react-icons/md";
import AnimationNumber from '../../../Components/AnimationNumber';
import {StableCoins} from '../../../../constants';

interface Props {
  denom: string,
  setDenom: Dispatch<SetStateAction<string>>,
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
  year: number,
  setYear: Dispatch<SetStateAction<number>>,
}
const Earn: FunctionComponent<Props> = ({denom, setDenom, year, setYear, amount, setAmount}) => {
  return (
    <VStack
      mt={'55px'}
      width={{ sm: '100%', md: '200px', lg: '254px' }}
      minWidth={{ sm: '0px', md: '200px', lg: '254px' }}
      align={'baseline'}
    >
      <Flex
        justify={'space-between'}
        w={'100%'}
      >
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          {denom}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            background={'none'}
            w={'20px'}
            h={'20px'}
            _hover={{ bg: 'none', color: '#F9D85E' }}
            _expanded={{ bg: 'none' }}
            _focus={{ bg: 'none', color: '#F9D85E' }}
            _active={{ bg: 'none' }}
          >
            <MdArrowDropDownCircle />
          </MenuButton>
          <MenuList background={'black'} borderColor={'black'} p={'0px'} w={'100px'} minWidth={'0px'} zIndex='2'>
            {StableCoins.map((item) => (
              item.upcoming === false && 
              <MenuItem
                onClick={() => setDenom(item.name)}
                _hover={{ bg: '#212121', color: '#F9D85E' }}
                _focus={{ bg: '#212121', color: 'white' }}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Divider orientation='horizontal' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'10px'}
        color='#CEC0C0'
      >
        Your Deposit
      </Text>
      <Input
        width={'100%'}
        color={'white'}
        border={'none'}
        value={amount}
        fontSize='20px'
        fontWeight='800'
        p='0px'
        onChange={(e) => {
          const re = /,/g;
          let value = re[Symbol.replace](e.target.value, '');
          setAmount(parseInt(value).toLocaleString())
        }}
        _focus={{ border: 'none' }}
        h='20px'
        mt='27px !important'
      />
      <Divider orientation='horizontal' mt='0px' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'10px'}
        color='#CEC0C0'
      >
        Amount in USD
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
        pt={'30px'}
      >
        {/* <AnimationNumber value={year} /> Years */}
        {year} Years
      </Text>
      <Slider
        aria-label='slider-ex-4'
        defaultValue={year}
        min={1}
        max={10}
        onChange={(value) => setYear(value)}
      >
        <SliderTrack bg='#F9D85E' />
        <SliderThumb boxSize={6} bg='#F9D85E'>
          <Box color='black' as={MdCode} />
        </SliderThumb>
      </Slider>
    </VStack>
  );
}
export default Earn;