import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button, Tooltip } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'

import {BigNumber} from 'bignumber.js';
import { getCoinId } from '../../../Util';
import { StableCoins, DECIMALS } from '../../../constants';
import Warning from './../../../assets/Warning.svg'
import AnimationNumber from '../../Components/AnimationNumber';
import { OpenDepositModal, OpenWithdrawModal, useStore } from '../../../store';
import { COINTYPE } from '../../../store'

interface Props {
  name: COINTYPE,
  description: string,
  stable: boolean,
  avatar: string,
  apr: number,
  upcoming: boolean
}

const CoinPanel: FunctionComponent<Props> = ({ name, description, avatar, apr, upcoming, stable }) => {
  const { state, dispatch } = useStore();

  let coinId = getCoinId(name);
  let amount = new BigNumber(state.userInfos[coinId].amount + state.userInfos[coinId].reward_amount).dividedBy(10 ** DECIMALS[coinId]);
  let usd = amount.multipliedBy(state.price[coinId]);
  return (
    <VStack
      minW={{ base: '100%', lg: '48%' }}
      rounded={'25px'}
      background={'#212121'}
      px={{ sm: '10px', md: '20px', lg: '47px' }}
      py={{ sm: '10px', md: '20px', lg: '55px' }}
      mt='30px'
      color='#CEBFBF'
    >
      <Stack
        direction='row'
        w='100%' align='center' justify={'space-between'}
      >
        <HStack spacing={'12px'} w='100%'>
          <Image src={'./' + avatar} w={'33px'} />
          <Flex direction='column' align='baseline'>
            <Text
              color='white'
              fontSize={'20px'}
              fontWeight='800'
            >
              {name}
            </Text>
            <Text
              fontSize='13px'
              fontWeight={'400'}
            >
              {description}
            </Text>
          </Flex>
        </HStack>
        <HStack ml='126px' spacing='30px' w='100%'>
          <VStack align='baseline' spacing='0px'>
            <HStack>
              <Text
                fontSize='13px'
                fontWeight='800'
              >
                Saving Balance
              </Text>
              <Image src={Warning} w={'13px'} />
            </HStack>
            {!stable &&
              <>
                <Text
                  fontSize='13px'
                  fontWeight={'400'}
                >
                  <AnimationNumber value = {amount.toNumber()} />
                  &nbsp;{name}
                </Text>
                <Text
                  fontSize='13px'
                  fontWeight={'400'}
                >
                  $ <AnimationNumber value = {usd.toNumber()} />
                  &nbsp;USD Value
                </Text>
              </>
            }
            {stable &&
              <Text
                fontSize='13px'
                fontWeight={'400'}
              >
                $ <AnimationNumber value = {usd.toNumber()} />
              </Text>
            }
          </VStack>
          <VStack align='baseline' spacing='0px'>
            <HStack>
              <Text
                fontSize='13px'
                fontWeight='800'
              >
                APY
              </Text>
              <Image src={Warning} w={'13px'} />
            </HStack>
            <Text
              fontSize='13px'
              fontWeight={'400'}
            >
              <AnimationNumber value={apr} />%
            </Text>
          </VStack>
        </HStack>
      </Stack>
      <Stack
        w={'100%'}
        pt={'37px'}
        spacing={'24px'}
        justify={'center'}
        align='center'
        direction={{ base: 'column', lg: 'row' }}
      >
        {upcoming == false &&
          <>
            <Button
              w={'200px'}
              h={'45px'}
              background={'#493C3C'}
              rounded={'25px'}
              onClick={() => {
                if(state.connected)
                  OpenDepositModal(state, dispatch, name)
                else if(state.openConnectWalletModal != undefined)
                  state.openConnectWalletModal();
              }}
            >
              <Text
                fontSize={'13px'}
                fontWeight={'860'}
                lineHeight={'15px'}

              >
                {state.connected &&
                  "Deposit"
                }
                {!state.connected &&
                  "Connect Wallet"
                }
              </Text>
            </Button>
            <Button
              w={'200px'}
              h={'45px'}
              background={'#212121'}
              border={'solid 1px'}
              borderColor={'#CEBFBF'}
              rounded={'25px'}
              onClick={() => {
                if(state.connected)
                  OpenWithdrawModal(state, dispatch, name)
                else if(state.openConnectWalletModal != undefined)
                  state.openConnectWalletModal();
              }}
            >
              <Text
                fontSize={'13px'}
                fontWeight={'860'}
                lineHeight={'15px'}
              >
                {state.connected &&
                  "Withdraw"
                }
                {!state.connected &&
                  "Connect Wallet"
                }
              </Text>
            </Button>
          </>
        }
        {upcoming == true &&
          <Button
            w={'100%'}
            h={'45px'}
            background={'#212121'}
            border={'solid 1px'}
            borderColor={'#CEBFBF'}
            rounded={'25px'}
          >
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
            >
              Coming Soon
            </Text>
          </Button>
        }
      </Stack>

    </VStack>
  );
}
export default CoinPanel;