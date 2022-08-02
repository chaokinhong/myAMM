import React from 'react'
import {
  Card,
  Form,
  Input,
  Avatar,
  Image,
  InputNumber,
  Checkbox,
  Button,
  Typography,
} from 'antd'
import TweenOne from 'rc-tween-one'
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin'
import WalletConnect from '../ConnectWallet'
import * as contract from '../../contractObject'
import { ethers } from 'ethers'
import { ContractContext } from '../../context'
import { useNavigate } from 'react-router'

const Buy = () => {
  TweenOne.plugins.push(Children)
  const [totalUSDT, settotalUSDT] = React.useState(0)
  const [totalETR, settotalETR] = React.useState(0)
  const [usdtBuyForm] = Form.useForm()
  const [etrBuyForm] = Form.useForm()
  const { ethersToInt ,connectWallet} = React.useContext(ContractContext)

  const [animation, setAnimation] = React.useState(null)
  const [animation1, setAnimation1] = React.useState(null)
  const [animation3, setAnimation3] = React.useState(null)
  const [animation4, setAnimation4] = React.useState(null)
  const navigate = useNavigate()

  const handleUsdtCalculate = async (vales) => {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()

    const total = ethers.utils.parseEther(vales.usdt)
    const price = await poolContract.getEtrAmount(total)
    const readablePrice = ethersToInt(price)
    settotalUSDT(total)
    setAnimation({
      Children: {
        value: readablePrice,
        floatLength: 2,
        formatMoney: true,
      },
      duration: 1000,
    })
    setAnimation1({
      Children: {
        value: vales.usdt / readablePrice,
        floatLength: 2,
        formatMoney: true,
      },
      duration: 1000,
    })
  }

  const handleEtrCalculate = async (values) => {
    const [
      poolContract,
      poolSigner,
      poolAddress,
    ] = await contract.poolContractObject()
    const total = ethers.utils.parseEther(values.etr)
    const price = await poolContract.getTokenAmount(total)
    const readablePrice = ethersToInt(price)
    settotalETR(total)
    setAnimation3({
      Children: {
        value: readablePrice,
        floatLength: 2,
        formatMoney: true,
      },
      duration: 1000,
    })
    setAnimation4({
      Children: {
        value: 1 / (values.etr / readablePrice),
        floatLength: 2,
        formatMoney: true,
      },
      duration: 1000,
    })
  }

  const handleUsdtBuy = async () => {
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

      await usdtContract.connect(poolSigner).approve(poolAddress, totalUSDT)
      const tx = await poolContract
        .connect(poolSigner)
        .tokenToEtrSwap(totalUSDT)
      await tx.wait()
      usdtBuyForm.resetFields()
      settotalUSDT(0)
      setAnimation({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
      setAnimation1({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
      navigate(0)
    } catch (error) {
      console.log(error)
      alert('Insufficient Balance')
      usdtBuyForm.resetFields()
      settotalUSDT(0)
      setAnimation({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
      setAnimation1({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
    }
  }

  const handleEtrBuy = async () => {
    try {
      const [
        poolContract,
        poolSigner,
        poolAddress,
      ] = await contract.poolContractObject()
      await poolContract.connect(poolSigner).approve(poolAddress, totalETR)
      console.log(totalETR)
      const tx = await poolContract.connect(poolSigner).EtrToTokenSwap(totalETR)
      await tx.wait()
      etrBuyForm.resetFields()
      settotalETR(0)
      setAnimation3({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
      setAnimation4({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
      navigate(0)
    } catch (error) {
      console.log(error)
      alert('Insufficient Balance')
      etrBuyForm.resetFields()
      settotalETR(0)
      setAnimation3({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
      setAnimation4({
        Children: {
          value: 0,
          floatLength: 2,
          formatMoney: true,
        },
        duration: 1000,
      })
    }
  }
  React.useEffect(()=>{
    connectWallet()
  },[])

  return (
    <div className="grid place-content-center mt-10" >
      <div className="grid grid-cols-3 gap-5">
        <Card
          style={{
            width: '352px',
            height: '352px',
            background: '#ececec',
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
          }}
        >
          <Form onFinish={handleUsdtCalculate} form={usdtBuyForm}>
            <Form.Item
              name="usdt"
              rules={[
                {
                  required: true,
                  message: 'Please input amount of USDT!',
                },
              ]}
            >
              <div className="flex place-content-center">
                <div className="flex-1 pr-5">
                  <Input
                    prefix={
                      <Avatar src="https://img.icons8.com/color/2x/tether--v2.png" />
                    }
                    style={{ textAlign: 'center', textAlignLast: 'center' }}
                    placeholder="amount of USDT"
                  />
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={usdtBuyForm.submit}
                    style={{ height: '35px', marginTop: '3px' }}
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="grid place-content-center">
                <Image
                  preview={false}
                  height={60}
                  src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/2x/external-down-arrow-arrow-flatart-icons-flat-flatarticons-7.png"
                />
              </div>
            </Form.Item>
            <div
              style={{ width: '100%' }}
              className="grid place-content-center"
            >
              <div className="grid grid-cols-2 gap-2 place-content-center">
                <TweenOne
                  animation={animation}
                  style={{ fontSize: 20, marginBottom: 2 }}
                >
                  0
                </TweenOne>
                <Typography style={{ fontSize: 20, marginBottom: 2 }}>
                  ETR
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-2 place-content-center">
                <TweenOne
                  animation={animation1}
                  style={{ fontSize: 20, marginBottom: 2 }}
                >
                  0
                </TweenOne>
                <Typography style={{ fontSize: 20, marginBottom: 2 }}>
                  USDT/ETR
                </Typography>
              </div>
            </div>
          </Form>
          <div className="grid place-content-center mt-5">
            <Button
              onClick={handleUsdtBuy}
              type="primary"
              style={{ height: '35px', width: '90px', marginTop: '3px' }}
            >
              Buy
            </Button>
          </div>
        </Card>
        <Card
          style={{
            width: '352px',
            height: '352px',
            background: '#ececec',
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
          }}
        >
          <Form onFinish={handleEtrCalculate} form={etrBuyForm}>
            <Form.Item
              name="etr"
              rules={[
                {
                  required: true,
                  message: 'Please input amount of ETR!',
                },
              ]}
            >
              <div className="flex place-content-center">
                <div className="flex-1 pr-5">
                  <Input
                    prefix={
                      <Avatar src="https://img.icons8.com/external-creatype-flat-colourcreatype/344/external-electron-science-education-flat-creatype-flat-colourcreatype.png" />
                    }
                    style={{ textAlign: 'center', textAlignLast: 'center' }}
                    placeholder="amount of ETR"
                  />
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={etrBuyForm.submit}
                    style={{ height: '35px', marginTop: '3px' }}
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="grid place-content-center">
                <Image
                  preview={false}
                  height={60}
                  src="https://img.icons8.com/fluency/344/long-arrow-down.png"
                />
              </div>
            </Form.Item>
            <div
              style={{ width: '100%' }}
              className="grid place-content-center"
            >
              <div className="grid grid-cols-2 gap-2 place-content-center">
                <TweenOne
                  animation={animation3}
                  style={{ fontSize: 20, marginBottom: 2 }}
                >
                  0
                </TweenOne>
                <Typography style={{ fontSize: 20, marginBottom: 2 }}>
                  USDT
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-2 place-content-center">
                <TweenOne
                  animation={animation4}
                  style={{ fontSize: 20, marginBottom: 2 }}
                >
                  0
                </TweenOne>
                <Typography style={{ fontSize: 20, marginBottom: 2 }}>
                  USDT/ETR
                </Typography>
              </div>
            </div>
          </Form>
          <div className="grid place-content-center mt-5">
            <Button
              onClick={handleEtrBuy}
              type="primary"
              style={{ height: '35px', width: '90px', marginTop: '3px' }}
            >
              Buy
            </Button>
          </div>
        </Card>
        <WalletConnect />
      </div>
    </div>
  )
}

export default Buy
