import { BigNumber } from "bignumber.js"
import { COINTYPE } from "./store";

export let net = "testnet";

export const TOKEN_ADDRESSES_TESTNET = [
  "ft.alenzertest.testnet",
  "other.alenzertest.testnet",
  "other.alenzertest.testnet",
  "other.alenzertest.testnet",
  "other.alenzertest.testnet",
  "other.alenzertest.testnet",
  "wrap.testnet",
];
export const TOKEN_ADDRESSES_MAINNET = [
  "ft.alenzertest.testnet",
  "ft.alenzertest.testnet",
  "ft.alenzertest.testnet",
  "ft.alenzertest.testnet",
  "ft.alenzertest.testnet",
  "ft.alenzertest.testnet",
  "ft.alenzertest.testnet",
];
export const TOKEN_ADDRESS = net == 'testnet'? TOKEN_ADDRESSES_TESTNET : TOKEN_ADDRESSES_MAINNET;
export const DECIMALS= [6, 6, 18, 18, 8, 18, 24];

export const REQUEST_ENDPOINT = "https://seashell-app-cmf7v.ondigitalocean.app/";


export const aprInfo = [1487, 1487, 1487, 1487, 987, 987, 987];
export const balanceInfo: BigNumber[] = [
  new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0),
  new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0)];
export const priceInfo = [1, 1, 1, 1, 1, 1, 1];
export const totalRewards = [0, 0, 0, 0, 0, 0, 0];

export const farmInfo = {
  account: '',
  amount: '0'
}

export const userInfo = {
  amount: "0",
  deposit_time: "0",
  reward_amount: "0",
  account: ""
}
export const userInfos = [userInfo, userInfo, userInfo, userInfo, userInfo, userInfo, userInfo, userInfo ]

export const potInfo = {
  account: "",
  amount: "0",
  qualified_amount: "0",
}
export const amountHistory = [
  {
    time: 1641281704,
    amount: totalRewards,
    reward: totalRewards,
    totalUSD: 0.0001,
  },
  {
    time: 1641281704,
    amount: totalRewards,
    reward: totalRewards,
    totalUSD: 0.0001,
  },
];

export const successOption: any = {
  position: "top-right",
  type: "success",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const errorOption: any = {
  position: "top-right",
  type: "error",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const StableCoins=[
  {
    name: 'USDC',
    id: 'usd-coin',
    description: 'USD Coin',
    avatar: 'Usdc.svg',
    apr: 14.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320,
    stable: true,
    upcoming: false
  },
  {
    name: 'USDT',
    id: 'tether',
    description: 'USD Tether',
    avatar: 'Usdt.svg',
    apr: 14.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: true,
    upcoming: false
  },
  {
    name: 'DAI',
    id: 'dai',
    description: 'Dai',
    avatar: 'Dai.svg',
    apr: 14.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: true,
    upcoming: false
  },
  {
    name: 'USN',
    id: 'usn',
    description: 'USD NEAR',
    avatar: 'Usn.svg',
    apr: 14.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: true,
    upcoming: false
  },
  {
    name: 'wBTC',
    id: 'wrapped-bitcoin',
    description: 'Wrapped Bitcoin',
    avatar: 'Wbtc.svg',
    apr: 9.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: false,
    upcoming: false
  },
  {
    name: 'ETH',
    id: 'ethereum',
    description: 'Ethereum',
    avatar: 'Eth.png',
    apr: 9.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: false,
    upcoming: false
  },
  {
    name: 'wNEAR',
    id: 'wrapped-near',
    description: 'Wrapped Near',
    avatar: 'Wnear.svg',
    apr: 9.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: false,
    upcoming: false
  },
  {
    name: 'NEARt',
    description: 'Near Treasury (Cooming Soon)',
    avatar: 'Neart.svg',
    apr: 9.87,
    tvl_coin: 47243320,
    tvl_usd: 47243320, 
    stable: false,
    upcoming: true
  }
]
