const { ethers } = require('ethers')
const Pool = artifacts.require('Pool')
const usdt = artifacts.require('USDT')
const uniswap = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const usdtaddr = '0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD'
const usdTSupply = ethers.utils.parseEther('1000000')
const usdTTSupply = ethers.utils.parseEther('1000')
const etrSupply = ethers.utils.parseEther('3770')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(usdt, usdTSupply)
  const usdtCon = await usdt.deployed()
  // console.log(usdtCon.address)

  await deployer.deploy(Pool, usdtCon.address, usdTTSupply, etrSupply)
  const pool = await Pool.deployed()

  //await electronToken.transfer(electricGenerator.address, electricGenerator.totalSupply())
}
