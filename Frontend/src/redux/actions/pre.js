import * as contract from '../../contractObject'
import { ethers } from 'ethers'


export const ethersToInt = (num) => parseFloat(num / 1000000000000000000).toFixed(2)
export const gweiToInt = (num) => ethers.utils.formatUnits(num,'gwei')
export const lockUsdt = async (params, history) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    const [
      usdtContract,
      usdtSigner,
      usdtAddress,
    ] = await contract.usdtContractObject()
    await usdtContract.connect(poolSigner).approve(poolAddress, params)
    const usdtadd = await poolContract
      .connect(poolSigner)
      .addTokenLiquidity(params)
    await usdtadd.wait()
    alert('Usdt staked')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}

export const lockEtr = async (params, history) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    await poolContract.connect(poolSigner).approve(poolAddress, params)
    const etradd = await poolContract
      .connect(poolSigner)
      .addEtrLiquidity(params)
    await etradd.wait()
    alert('ETR staked')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}

export const lockElec = async (params, history) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    const elecadd = await poolContract.electricityToEtr(params)
    await elecadd.wait()
    alert('Electricity locked')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}

export const getData = () => async (dispatch) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    
    console.log(poolContract)
    const bigdata = await poolContract.getTotalTokenReserve()
    console.log(bigdata)
    const data = Number(ethers.utils.formatEther(bigdata))
    const bigdata1 = await poolContract.getTotalEtrReserve()
    const data1 = Number(ethers.utils.formatEther(bigdata1))
    const bigdata2 = await poolContract.getTotalEtrSupply()
    const data2 = Number(ethers.utils.formatEther(bigdata2))
    const usdtRewardBalance = await poolContract.getTokenRewardBalance()
    const usdtData = ethersToInt(Number(usdtRewardBalance))
    const etrRewardBalance = await poolContract.getEtrRewardBalance()
    const etrData = ethersToInt(Number(etrRewardBalance))
    const usdtRewardRatio = await poolContract.getTokenRewardRatio()
    const usdtRatioData = ethersToInt(Number(usdtRewardRatio))
    const etrRewardRatio = await poolContract.getEtrRewardRatio()
    const etrRatioData = ethersToInt(Number(etrRewardRatio))
    dispatch({
      type: 'FETCH_DATA',
      payload: {
        usdt: data,
        etr: data1,
        elec: data2,
        usdtRewardBalance: usdtData,
        etrRewardBalance: etrData,
        usdtRewardRatio: usdtRatioData,
        etrRewardRatio: etrRatioData,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const stakeUsdt = async (params, history) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    const [
      usdtContract,
      usdtSigner,
      usdtAddress,
    ] = await contract.usdtContractObject()
    await usdtContract.connect(poolSigner).approve(poolAddress, params)
    const usdtadd = await poolContract
      .connect(poolSigner)
      .addTokenLiquidity(params)
    await usdtadd.wait()
    alert('USDT staked')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}

export const stakeEtr = async (params, history) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    await poolContract.connect(poolSigner).approve(poolAddress, params)
    const etradd = await poolContract
      .connect(poolSigner)
      .addEtrLiquidity(params)
    await etradd.wait()
    alert('ETR staked')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}

export const withdrawUsdt = async (params,history) =>{
  try{
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    const [
      usdtContract,
      usdtSigner,
      usdtAddress,
    ] = await contract.usdtContractObject()
    await usdtContract.connect(poolSigner).approve(poolAddress, params)
    const usdtadd = await poolContract
    .connect(poolSigner)
    .withdrawTokenLiquidity(params)
  await usdtadd.wait()
  alert('USDT withdraw')
  } catch(error){
    console.log(error)
    alert('something wrong')
  }
}

export const withdrawEtr = async (params, history) => {
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    await poolContract.connect(poolSigner).approve(poolAddress, params)
    const etradd = await poolContract
      .connect(poolSigner)
      .withdrawEtrLiquidity(params)
    await etradd.wait()
    alert('ETR withdraw')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}

export const etr2Electricity = async (params) =>{
  try {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    const elecadd = await poolContract.etrToElectricity(params)
    await elecadd.wait()
    alert('Electricity exchanged')
  } catch (error) {
    alert('Something wrong')
    console.log(error)
  }
}