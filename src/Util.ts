import { AppContextInterface, ActionKind } from './store'
import {BigNumber} from 'bignumber.js'

import * as nearAPI from "near-api-js"

import { toast } from 'react-toastify';
import axios from 'axios';
import { COINTYPE, useNear, useDecimal } from './store';
import { successOption, errorOption, StableCoins, TOKEN_ADDRESS, DECIMALS, balanceInfo, priceInfo, userInfo } from './constants';
import { CONTRACT_NAME } from './config';

export function shortenAddress(address: string | undefined) {

  if (address) {
    let prefix = address.slice(0, 5);
    let suffix = address.slice(-5)
    return prefix + "..." + suffix;
  }
  return "";
}

function calcUSD(amountHistory: any, price: number[]) {
  if (amountHistory == undefined) return undefined;

  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  for (let i = 0; i < amountHistory.length; i++) {
    let totalUSD = new BigNumber(0);

    for(let j=0; j<coins.length; j++){
      let usd = new BigNumber(amountHistory[i].amount[j] + amountHistory[i].reward[j]);
      usd = usd.multipliedBy(price[j]).dividedBy(10**DECIMALS[j]);
      totalUSD = totalUSD.plus(usd);
    }
    amountHistory[i].totalUSD = totalUSD;
  }

  return amountHistory;
}
export async function fetchData(state: AppContextInterface, dispatch: React.Dispatch<any>) {
  dispatch({ type: ActionKind.setLoading, payload: true });

  const wallet = state.wallet;

  let balance = balanceInfo;
  let coins = StableCoins.filter((coin) => coin.upcoming == false);
  for (let i = 0; i < coins.length; i++) {
    const token: any = new nearAPI.Contract(
      wallet.account(), // the account object that is connecting
      TOKEN_ADDRESS[i],
      {
        viewMethods: ["ft_balance_of"],
        changeMethods: [],
      }
    );
    let res = await token.ft_balance_of({ account_id: wallet.getAccountId() })

    const decimal = DECIMALS[i];
    balance[i] = new BigNumber(res).dividedBy(10 ** decimal);
  }

  dispatch({ type: ActionKind.setBalance, payload: balance });

  let status: any = undefined
  let price = priceInfo;
  let res: any;

  for(let i=0; i<coins.length; i++){
    try {
      res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coins[i].id}&vs_currencies=usd`
      );
    } catch (e) { }

    price[i] = res.data[`${coins[i].id}`]["usd"];
  }
  
  const contract: any = new nearAPI.Contract(
    wallet.account(), // the account object that is connecting
    CONTRACT_NAME,
    {
      viewMethods: ["get_status"],
      changeMethods: [],
    }
  );

  status = await contract.get_status({ account: wallet.getAccountId() })
console.log(status)
  if (status) {
    if (status.amount_history !== undefined)
      dispatch({ type: ActionKind.setAmountHistory, payload: calcUSD(status.amount_history, price) });

    if (status.apr !== undefined)
      dispatch({ type: ActionKind.setApr, payload: status.apr });

    //---------NEARt--------------???
    let nearT_Info = {
      amount: status.farm_info.amount,
      deposit_time: "0",
      reward_amount: "0",
      account: ""
    }
    status.user_info.push(nearT_Info);
    price[getCoinId("NEARt")] = status.farm_price / 100;
    //------------------------------------
    if (status.user_info !== undefined)
      dispatch({ type: ActionKind.setUserInfos, payload: status.user_info });

    if (status.farm_price !== undefined)
      dispatch({ type: ActionKind.setFarmPrice, payload: parseInt(status.farm_price) });

    if (status.farm_info !== undefined)
      dispatch({ type: ActionKind.setFarmInfo, payload: status.farm_info });

    if (status.farm_starttime !== undefined)
      dispatch({ type: ActionKind.setFarmStartTime, payload: parseInt(status.farm_starttime) });

    if (status.total_rewards != undefined)
      dispatch({ type: ActionKind.setTotalRewards, payload: status.total_rewards });

    if (status.pot_info != undefined)
      dispatch({ type: ActionKind.setPotInfo, payload: status.pot_info });
  }

  dispatch({ type: ActionKind.setPrice, payload: price });

  dispatch({ type: ActionKind.setLoading, payload: false });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function floorNormalize(amount: number) {
  return Math.floor(amount / 10 ** 4) / 100;
}

export function floor(amount: number) {
  return Math.floor(amount * 100) / 100;
}

export function getDateString(time: number) {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let datetime = new Date(time * 1000)
  return (month[datetime.getMonth()] + "   " + datetime.getDate() + " , " + datetime.getFullYear());
}

export function getCoinParam(coin: COINTYPE) {
  for (let i = 0; i < StableCoins.length; i++) {
    if (StableCoins[i].name == coin) {
      return StableCoins[i];
    }
  }
}

export const getCoinId = (coin: COINTYPE) => {
  // export type COINTYPE = 'USDC' | 'USDT' | 'DAI' | 'USN' | 'wBTC' | 'ETH' | 'wNEAR' | 'NEARt';
  switch (coin) {
    case 'USDC': return 0;
    case 'USDT': return 1;
    case 'DAI': return 2;
    case 'USN': return 3;
    case 'wBTC': return 4;
    case 'ETH': return 5;
    case 'wNEAR': return 6;
    case 'NEARt': return 7;
  }
  return 0;
}