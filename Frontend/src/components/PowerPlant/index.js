import {
  Button,
  Card,
  Form,
  Modal,
  Typography,
  Input,
  Avatar,
  Menu,
  Image,
  Spin,
} from 'antd'
import * as reduxfunction from '../../redux/actions/pre'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
import { ContractContext } from '../../context'

const PowerPlant = () => {
  const [seeModal, setSeeModal] = React.useState(false)
  const [elrForm] = Form.useForm()
  const [totalElec, setTotalElec] = React.useState()
  const [spinnings, setSpinning] = React.useState(false)
  const navigate = useNavigate()
  const pre = useSelector((state) => state.preReducer)
  const [curElec, setCurElec] = React.useState(0)
  const { spinning } = React.useContext(ContractContext)

  const init = () => {
    const elec = pre?.elec
    setCurElec(elec)
  }

  const handleFinish = (data) => {
    setTotalElec(data.elec)
    setSeeModal(true)
  }

  React.useEffect(() => {
    init()
  }, [pre])

  const handleExchange = async () => {
    setSpinning(true)
    await reduxfunction.lockElec(totalElec)
    setSpinning(false)
    elrForm.resetFields()
    setSeeModal(false)
    navigate(0)
  }

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
      <Spin spinning={spinning} tip="waiting the liquidity reach the target...">
        <div className="grid place-content-center mt-14">
          <div className="grid place-content-center grid-cols-2 gap-10">
            <Card
              style={{
                width: '400px',
                height: '280px',
                background: '#ececec',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              }}
            >
              <Typography.Title underline style={{ color: '#c9b308' }}>
                Electricity Generator
              </Typography.Title>
              <Typography.Text strong>
                1 kwh electricity = 1 ETR{' '}
              </Typography.Text>
              <Form form={elrForm} onFinish={handleFinish}>
                <Form.Item
                  name="elec"
                  rules={[
                    {
                      required: true,
                      message: 'Please input amount of electricyt per kwh!',
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <Avatar src="https://img.icons8.com/external-flat-kendis-lasman/344/external-electricity-ecommerce-flat-flat-kendis-lasman.png" />
                    }
                    style={{ textAlign: 'center', textAlignLast: 'center' }}
                    placeholder="amount of electricity"
                  />
                </Form.Item>
                <Form.Item>
                  <div className="grid place-content-center mt-5">
                    <Button
                      type="primary"
                      style={{ backgroundColor: '#c9b308', border: '#c9b308' }}
                      onClick={elrForm.submit}
                    >
                      Exchange
                    </Button>
                  </div>
                </Form.Item>
              </Form>

              <Modal
                title="Electricity Market"
                visible={seeModal}
                onOk={handleExchange}
                onCancel={() => {
                  setSeeModal(false)
                  elrForm.resetFields()
                }}
              >
                Your total exchange is {totalElec} ETR, are you sure to exchange
                ?
              </Modal>
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
                    {curElec} Kwh
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default PowerPlant
