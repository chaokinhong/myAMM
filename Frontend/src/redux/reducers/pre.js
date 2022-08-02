import * as contract from '../../contractObject'
import { ethers } from 'ethers'

const preReducer = (
  pre = {
    usdt: 0,
    etr: 0,
    elec: 0,
    usdtRewardBalance: 0,
    etrRewardBalance: 0,
    usdtRewardRatio: 0,
    etrRewardRatio: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return action.payload
    default:
      return pre
  }
}

export default preReducer
