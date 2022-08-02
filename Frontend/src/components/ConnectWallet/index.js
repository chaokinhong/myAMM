import React from 'react'
import { Card, Badge, Typography, Button } from 'antd'
import { ContractContext } from '../../context'
import * as walletModule from '../../walletModule/wallet'
import './styles.css'

const WalletConnect = () => {
  const {
    shortenAddress,
    connectWallet,
    id,
    account,
    myEtrBalance,
    myUsdtBalance,
  } = React.useContext(ContractContext)


  const generateWallet = () => {
    const wallet = walletModule.createWallet()
    console.log('wallet',wallet)
    const encryptedWallet = walletModule.encryptWallet(wallet, '123')
    console.log('encryptedWallet',encryptedWallet)
    const decryptWallet = walletModule.decryptWallet(encryptedWallet, '123')
    console.log('decryptwallet',decryptWallet)
  }

  const networkName = (id) => {
    switch (id) {
      case 1:
        return 'Ethereum mainnet'
      case 3:
        return 'Rospten testnet'
      case 137:
        return 'Polygon mainnet'
      case 4:
        return 'Rinkeby testnet'
      case 56:
        return 'Binance mainnet'
      case 1337:
        return 'Ganache local'
    }
  }


  return (
    <div className="grid place-content-center">
      <div className="grid place-content-center">
        <Card
          style={{
            width: '600px',
            height: '300px',
            background: '#ececec',
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
          }}
        >
          <div className="grid place-content-center">
            <Typography.Title underline={true} style={{ color: 'green' }}>
              {' '}
              My Wallet
            </Typography.Title>
          </div>
          <div className="grid grid-rows-4 gap-6">
            {account ? (
              <div className="grid place-content-center">
                <Badge
                  style={{ marginRight: '15px', font: 'message-box' }}
                  status="success"
                  text="Connected"
                />
              </div>
            ) : (
              <div className="grid place-content-center">
                <Badge
                  style={{ marginRight: '15px', font: 'message-box' }}
                  status="error"
                  text="Not Connected"
                />
              </div>
            )}

            <Typography style={{ font: 'message-box',position:'relative' }}>
              {' '}
              Address: {account}
            </Typography>
            <Typography style={{ font: 'message-box' }}>
              {' '}
              Network: {networkName(id)}
            </Typography>
            <Typography.Text
              style={{ font: 'message-box', fontSize: '14px' }}
              strong
            >
              My USDT : {myUsdtBalance} USDT
            </Typography.Text>
            <Typography.Text
              style={{ font: 'message-box', fontSize: '14px' }}
              strong
            >
              My ETR : {myEtrBalance} ETR
            </Typography.Text>
          </div>
        </Card>
      
      </div>
    </div>
  )
}

export default WalletConnect
