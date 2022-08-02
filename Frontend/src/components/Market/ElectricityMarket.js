import { Button, Card, Form, Modal, Typography, Input, Avatar } from 'antd'
import * as reduxfunction from '../../redux/actions/pre'
import { useNavigate } from 'react-router'
import React from 'react'

const ElectricityMarket = () => {
  const [seeModal, setSeeModal] = React.useState(false)
  const [elrForm] = Form.useForm()
  const [totalElec, setTotalElec] = React.useState()
  const [spinning, setSpinning] = React.useState(false)
  const navigate = useNavigate()

  const handleFinish = (data) => {
    setTotalElec(data.elec)
    setSeeModal(true)
  }

  const handleExchange = async () => {
    setSpinning(true)
    await reduxfunction.etr2Electricity(totalElec)
    setSpinning(false)
    elrForm.resetFields()
    setSeeModal(false)
    navigate(0)
  }

  return (
    <div className="grid place-content-center mt-14">
      <Card
        style={{
          width: '352px',
          height: '352px',
          background: '#ececec',
          boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
        }}
      >
        <Typography.Title underline style={{ color: '#c9b308' }}>
          Electricity Market
        </Typography.Title>
        <Typography.Text strong>1 ETR = 1 kwh electron</Typography.Text>
        <Form form={elrForm} onFinish={handleFinish}>
          <Form.Item
            name="elec"
            rules={[
              {
                required: true,
                message: 'Please input amount of ETR!',
              },
            ]}
          >
            <Input
              prefix={
                <Avatar src="https://img.icons8.com/external-creatype-flat-colourcreatype/344/external-electron-science-education-flat-creatype-flat-colourcreatype.png" />
              }
              style={{ textAlign: 'center', textAlignLast: 'center' }}
              placeholder="amount of ETR"
            />
          </Form.Item>
          <Form.Item>
            <div className="grid place-content-center">
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
          Your total exchange is {totalElec} kwh Electricity, are you sure to
          exchange ?
        </Modal>
      </Card>
    </div>
  )
}

export default ElectricityMarket
