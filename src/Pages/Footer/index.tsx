import React, { FunctionComponent, useEffect, useState } from 'react';
import { HStack, Stack, VStack, Flex, Text, Image, Link, Center, Divider } from '@chakra-ui/react'
import * as nearAPI from "near-api-js";

import { getConfig } from '../../config';
import { useStore } from '../../store';
import GreenLamp from './../../assets/GreenLamp.svg'
import Twitter from './../../assets/Twitter.svg'
import Subtract from './../../assets/Subtract.svg'
import Medium from './../../assets/Medium.svg'

const Footer: FunctionComponent = (props) => {
  const [blockHeight, setBlockHeight] = useState(""); 
  const [timer, setTimer] = useState(0);
  const nearConfig = getConfig("testnet");

  useEffect( () => {
    const fetch = async() => {
      const near = await nearAPI.connect(
        Object.assign(
          { deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } },
          nearConfig)
      );
  
      let chain = (await near.connection.provider.status()).sync_info;
      let hash = chain.latest_block_hash; // <-- note hash vs height
      
      setBlockHeight(hash);
    }
    fetch();
  }, []);

  return (
    <Flex
      direction={'row'}
      px={{ sm: '10px', md:'20px', lg: '109px' }}
      pt={'108px'}
      pb={'104px'}
      w={'100%'}
      justify={'space-between'}
      align={'center'}
    >
      <HStack spacing={'5px'}>
        <Image src={GreenLamp} w={'10px'}/>
        <Link href={`https://explorer.testnet.near.org/blocks/${blockHeight}`} target='_blank' rel="noreferrer">
          <Text
            ml={'5px'}
            fontSize={'9px'}
            fontWeight={'860'}
            lineHeight={'10px'}
          >
            LATEST BLOCK:&nbsp;&nbsp;&nbsp;{blockHeight}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Text>
        </Link>
        <Link href='/terms'>
          <Text
            fontSize={'9px'}
            fontWeight={'860'}
            lineHeight={'10px'}
          >
            TERMS
          </Text>
        </Link>
      </HStack>
      <HStack spacing={'50px'}>
        <a href='https://twitter.com' target='_blank' rel="noreferrer">
          <Image src={Twitter} w={'15px'} />
        </a>
        <a href='https://web.telegram.org/k/' target='_blank' rel="noreferrer">
        <Image src={Subtract} w={'15px'} />
        </a>
        <a href='https://medium.com' target='_blank' rel="noreferrer">
          <Image src={Medium} w={'15px'} />
        </a>
        <a href='https://www.gitbook.com' target='_blank' rel="noreferrer">
          <Text
            fontSize={'9px'}
            fontWeight={'860'}
            lineHeight={'10px'}
          >
            DOCS
          </Text>
        </a>
      </HStack>
    </Flex>
  );
}
export default Footer;