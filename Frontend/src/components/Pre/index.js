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
} from '@ant-design/icons'
import WalletConnect from '../ConnectWallet'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modals from './Modal'

const Pre = () => {
  const [curPage, setCurPage] = React.useState(1)
  const [seeModal, setSeeModal] = React.useState(false)
  const [token, setToken] = React.useState('')
  const [percent, setPercent] = React.useState({ usdt: 0, etr: 0, elec: 0 })
  const [spinning, setSpinning] = React.useState(false)
  const [targetUsdt, setTargetUsdt] = React.useState(0)
  const [targetEtr, setTargetEtr] = React.useState(0)


  const handlePage = (e) => {
    setCurPage(e.key)
  }
  const pre = useSelector((state) => state.preReducer)

  const handleUsdt = () => {
    setSeeModal(true)
    setToken('usdt')
  }

  const handleEtr = () => {
    setSeeModal(true)
    setToken('etr')
  }

  const init = () => {
    const usdt = pre?.usdt
    const etr = pre?.etr
    const elec = pre?.elec
    const targetUsdt = 100
    const targetEtr = 377
    setPercent({
      usdt: twoDp((usdt * 100) / targetUsdt),
      etr: twoDp((etr * 100) / targetEtr),
      elec: elec,
    })
    if (
      twoDp((usdt * 100) / targetUsdt) >= 100.0 &&
      twoDp((etr * 100) / targetEtr) >= 100.0
    ) {
      setSpinning(true)
    }
    setTargetUsdt(targetUsdt)
    setTargetEtr(targetEtr)
  }

  const twoDp = (int) => {
    return parseFloat(int).toFixed(2)
  }

  React.useEffect(() => {
    init()
  }, [pre])
 

  return (
    <div>
      <Menu mode="horizontal" onClick={handlePage} defaultSelectedKeys={1}>
        <Menu.Item key={1} icon={<MailOutlined />}>
          Pool
        </Menu.Item>
        <Menu.Item key={2} icon={<AppstoreOutlined />}>
          <Button
            style={{ border: 'none' }}
            onClick={() => {
              setToken('electricity')
              setSeeModal(true)
            }}
          >
            Lock Electricity
          </Button>
        </Menu.Item>
        <Menu.Item key={3} icon={<AppstoreOutlined />}>
          My Wallet
        </Menu.Item>
        <Menu.Item key={4} icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
      <div className="grid place-content-center">
        <Card
          style={{
            width: '500px',
            height: '200px',
            background: 'pink',
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            marginTop: '10px',
          }}
        >
          {percent.usdt >= 100.0 && percent.etr >= 100.0 ? (
            <Timeline style={{font:'message-box', color:'green', fontStyle:'initial'}} pending="Electricity lock, new liquidity add, electricity trading...">
              <Timeline.Item>
                Lanunch services to Rinkeby Ethereum testnet at 2022-07-11
              </Timeline.Item>
              <Timeline.Item>Pool Build successful at</Timeline.Item>
            </Timeline>
          ) : (
            <Timeline pending="Pool Building...">
              <Timeline.Item>
                Lanunch services to Rinkeby Ethereum testnet at 2022-07-11
              </Timeline.Item>
            </Timeline>
          )}
        </Card>
      </div>
      <div className="grid place-content-center mt-5 w-screen">
        {curPage == 1 && (
          <div className="grid grid-cols-3 gap-6">
            <Card
              style={{
                width: '352px',
                height: '352px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <Spin spinning={spinning} tip="Pool build successful">
                <div className="grid place-content-center">
                  <Typography.Title
                    underline={true}
                    style={{ width: '247.1px', textAlign: 'center' }}
                    level={3}
                  >
                    USDT pre stake
                  </Typography.Title>
                  <div className="grid place-content-center">
                    <Typography.Text style={{ font: 'message-box' }} strong>
                      Target: {targetUsdt} USDT
                    </Typography.Text>
                  </div>
                  <div className="grid  place-content-center mt-4">
                    <Progress
                      type="circle"
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={percent?.usdt}
                    />
                  </div>
                </div>
                <Progress
                  strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                  }}
                  style={{ marginTop: '14px' }}
                  percent={percent?.usdt}
                  status="active"
                />

                <div className="grid mt-5 place-content-center">
                  <Button onClick={handleUsdt}>Lock</Button>
                </div>
              </Spin>
            </Card>
            <Card
              style={{
                width: '352px',
                height: '352px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <Spin spinning={spinning} tip="Pool build successful">
                <div className="grid  place-content-center">
                  <Typography.Title level={3} underline={true}>
                    ETR pre stake
                  </Typography.Title>
                  <div className="grid place-content-center">
                    <Typography.Text style={{ font: 'message-box' }} strong>
                      Target: {targetEtr} ETR
                    </Typography.Text>
                  </div>
                  <div className="grid  place-content-center mt-4">
                    <Progress
                      type="circle"
                      strokeColor={{
                        '0%': '#f312ff',
                        '100%': '#dfff12',
                      }}
                      percent={percent?.etr}
                    />
                  </div>
                </div>
                <Progress
                  style={{ marginTop: '14px' }}
                  strokeColor={{
                    from: '#f312ff',
                    to: '#dfff12',
                  }}
                  percent={percent?.etr}
                  status="active"
                />

                <div className="grid mt-5 place-content-center">
                  <Button onClick={handleEtr}>Lock</Button>
                </div>
              </Spin>
            </Card>
            <Card
              style={{
                width: '352px',
                height: '352px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <div className="grid place-content-center">
                <Typography.Title
                  underline={true}
                  style={{ width: '247.1px', textAlign: 'center' }}
                  level={3}
                >
                  Electricity lock
                </Typography.Title>
                <div className="grid  place-content-center mt-4">
                  <Image
                    width={150}
                    preview={false}
                    src="https://img.icons8.com/cotton/344/car-battery--v1.png"
                  />
                  <div className="grid place-content-center mt-2 font-bold text-lg">
                    {percent?.elec} Kwh
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {curPage == 3 && <WalletConnect />}
        <Modals
          setSeeModal={setSeeModal}
          seeModal={seeModal}
          token={token}
          setMeun={setCurPage}
        />
      </div>
    </div>
  )
}

export default Pre
