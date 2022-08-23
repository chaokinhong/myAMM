import { ethers } from 'ethers'
import Pool from './abis/Pool.json'
import USDT from './abis/USDT.json'
import ElectronDAO from './abis/ElectronDAO.json'
import * as walletModule from './walletModule/wallet'

export const poolContractObject = async () => {
  const wallet = walletModule.getWallet()
  const contractJsonData = Pool.networks[5777]
  const contract = new ethers.Contract(
    contractJsonData.address,
    Pool.abi,
    wallet,
  )
  return [contract, wallet, contractJsonData.address]
}

export const usdtContractObject = async () => {
  const wallet = walletModule.getWallet()
  const contractJsonData = USDT.networks[5777]
  const contract = new ethers.Contract(
    contractJsonData.address,
    USDT.abi,
    wallet,
  )
  return [contract, wallet, contractJsonData.address]
}

export const xerraContractObject = async () => {
  const wallet = walletModule.getWallet()
  const contractJsonData = ElectronDAO.networks[5777]
  const contract = new ethers.Contract(
    contractJsonData.address,
    ElectronDAO.abi,
    wallet,
  )
  return [contract, wallet, contractJsonData.address]
}

export const ownerXerraContractContract = async (wallet) => {
  const contractJsonData = ElectronDAO.networks[5777]
  const contract = new ethers.Contract(
    contractJsonData.address,
    ElectronDAO.abi,
    wallet,
  )
  return [contract, wallet, contractJsonData.address]
}

export const ownerUsdtContractObject = async (wallet) => {
  const contractJsonData = USDT.networks[5777]
  const contract = new ethers.Contract(
    contractJsonData.address,
    USDT.abi,
    wallet,
  )
  return [contract, wallet, contractJsonData.address]
}

export const ownerPoolContractObject = async (wallet) => {
  const contractJsonData = Pool.networks[5777]
  const contract = new ethers.Contract(
    contractJsonData.address,
    Pool.abi,
    wallet,
  )
  return [contract, wallet, contractJsonData.address]
}