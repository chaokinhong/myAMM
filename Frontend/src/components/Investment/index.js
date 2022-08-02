import React from 'react'
import {
  Progress,
  Typography,
  Menu,
  Card,
  Timeline,
  Button,
  Image,
  Spin,
} from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import Modals from './Modal'
import { Liquid } from '@ant-design/plots'
import { Link } from 'react-router-dom'
import { ContractContext } from '../../context'

const Investment = () => {
  const [reward, setReward] = React.useState()
  const [seeModal, setSeeModal] = React.useState(false)
  const [token, setToken] = React.useState()
  const { spinning } = React.useContext(ContractContext)

  const config = {
    percent: parseFloat(reward?.usdtRewardRatio).toFixed(2),
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
  }

  const config1 = {
    percent: parseFloat(reward?.etrRewardRatio).toFixed(2),
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
  }

 
  const pre = useSelector((state) => state.preReducer)
  console.log(pre)

  const handleETRstake = () => {
    setSeeModal(true)
    setToken('etrstake')
  }

  const handleETRwithdraw = () => {
    setSeeModal(true)
    setToken('etrwithdraw')
  }

  const handleUSDTstake = () => {
    setSeeModal(true)
    setToken('usdtstake')
  }
  const handleUSDTwithdraw = () => {
    setSeeModal(true)
    setToken('usdtwithdraw')
  }

  const init = () => {
    const usdtRewardBalance = pre?.usdtRewardBalance
    const etrRewardBalance = pre?.etrRewardBalance
    const usdtRewardRatio = pre?.usdtRewardRatio
    const etrRewardRatio = pre?.etrRewardRatio
    setReward({
      usdtRewardBalance,
      etrRewardBalance,
      usdtRewardRatio,
      etrRewardRatio,
    })
  }

  React.useEffect(() => {
    init()
  }, [pre])

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
      <Spin
        spinning={spinning}
        tip="Waiting for the liquidity reach the target..."
      >
        <div className="grid  place-content-center mt-6">
          <div className="grid place-content-center">
            <Card
              style={{
                width: '500px',
                height: '200px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
                margin: '10px',
              }}
            >
              <div className="grid grid-rows-3 gap-2">
                <Typography.Text
                  style={{ font: '18px message-box', color: 'red' }}
                  underline
                  strong
                >
                  Reward calculation is equal to percent of share * amount of
                  reward balance
                </Typography.Text>
                <Typography.Text
                  style={{ font: '18px message-box', color: 'rgb(10,99,37)' }}
                >
                  Current USDT reward balance: {reward?.usdtRewardBalance} USDT
                </Typography.Text>
                <Typography.Text
                  style={{ font: '18px message-box', color: 'rgb(138,167,16)' }}
                >
                  Current ETR reward balance: {reward?.etrRewardBalance} ETR
                </Typography.Text>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-3 place-content-center gap-2 mt-6">
            <Card
              style={{
                width: '352px',
                height: '320px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <div className="grid grid-row-2 place-content-center">
                <div className="grid place-content-center">
                  <Typography.Text
                    style={{ font: '18px message-box', color: 'rgb(10,99,37)' }}
                    underline
                    strong
                  >
                    My Share in USDT Reward Balance
                  </Typography.Text>
                </div>

                <Liquid
                  {...config}
                  width={200}
                  height={200}
                  style={{ font: 'message-box', marginTop: '20px' }}
                  color="rgb(10,99,37)"
                />
              </div>
            </Card>
            <Card
              style={{
                width: '352px',
                height: '320px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <div className="grid grid-row-2 place-content-center">
                <div className="grid place-content-center">
                  <Typography.Text
                    style={{
                      font: '18px message-box',
                      color: 'rgb(138,167,16)',
                    }}
                    underline
                    strong
                  >
                    My Share in ETR Reward Balance
                  </Typography.Text>
                </div>

                <Liquid
                  {...config1}
                  width={200}
                  height={200}
                  style={{ font: 'message-box', marginTop: '20px' }}
                  color="rgb(138,167,16)"
                />
              </div>
            </Card>
            <Card
              style={{
                width: '352px',
                height: '320px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <div className="grid grid-row-3 place-content-center">
                <div className="grid place-content-center">
                  <Typography.Text
                    style={{ font: '18px message-box', color: 'rgb(10,99,37)' }}
                    underline
                    strong
                  >
                    My Stake Balance
                  </Typography.Text>
                </div>
                <div className="grid place-content-center">
                  <div className="flex flex-col-1 place-content-center gap-1">
                    <Typography.Text
                      style={{
                        font: '22px message-box',
                        color: 'rgb(10,99,37)',
                        marginTop: '28px',
                      }}
                      strong
                    >
                      My USDT staked: {reward?.usdtRewardBalance}
                    </Typography.Text>
                    <div className="grid place-content-center mt-6">
                      <Image
                        src="https://img.icons8.com/color/344/tether--v2.png"
                        width={30}
                        height={30}
                        prefix={false}
                      />
                    </div>
                  </div>
                  <div className="grid place-content-center">
                    <div className="flex flex-col-1 place-content-center gap-1">
                      <Typography.Text
                        style={{
                          font: '22px message-box',
                          color: 'rgb(138,167,16)',
                          marginTop: '28px',
                        }}
                        strong
                      >
                        My ETR staked: {reward?.usdtRewardBalance}
                      </Typography.Text>
                      <div className="grid place-content-center mt-6">
                        <Image
                          src="https://img.icons8.com/external-creatype-flat-colourcreatype/344/external-electron-science-education-flat-creatype-flat-colourcreatype.png"
                          width={30}
                          height={30}
                          prefix={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-7 ">
                  <Button type="primary" onClick={handleUSDTstake}>
                    Stake USDT
                  </Button>
                  <Button type="primary" onClick={handleUSDTwithdraw}>
                    Withdraw USDT
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      background: 'rgb(138,167,16)',
                      border: 'rgb(138,167,16)',
                    }}
                    onClick={handleETRstake}
                  >
                    Stake ETR
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      background: 'rgb(138,167,16)',
                      border: 'rgb(138,167,16)',
                    }}
                    onClick={handleETRwithdraw}
                  >
                    Withdraw ETR
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Spin>
      <Modals setSeeModal={setSeeModal} seeModal={seeModal} token={token} />
    </div>
  )
}

export default Investment
