import React from 'react'
import { Form, Modal, Typography, Input, Avatar, Spin } from 'antd'
import { ContractContext } from '../context'
import { useNavigate } from 'react-router'
import * as reduxAction from '../redux/actions/pre'

const ValidateModal = ({
  params,
  setParams,
  estimateGas,
  setEstimateGas,
  setSeeModal,
  token,
}) => {
  const [validateForm] = Form.useForm()
  const {
    checkNum,
    showValidate,
    setShowValidate,
    validateFundPassword,
  } = React.useContext(ContractContext)

  const [spinning, setSpinning] = React.useState(false)
  const navigate = useNavigate()

  const handleCancel = () =>{
    setSeeModal(false)
    setShowValidate(false)
    navigate(0)
    setParams()
    setEstimateGas()

  }
  const handleValidation = async (form) => {
    const isCorrect = await validateFundPassword(form.fpw)
    switch (token) {
      case 'usdt':
        if (isCorrect) {
          setSpinning(true)
          await reduxAction.lockUsdt(params, navigate)
          validateForm.resetFields()
          setSeeModal(false)
          setShowValidate(false)
          setParams()
          setEstimateGas()
          navigate(0)
          setSpinning(false)
        } else {
          alert('Wrong Fund Password')
          validateForm.resetFields()
        }
      case 'electricity':
        if (isCorrect) {
          setSpinning(true)
          await reduxAction.lockElec(params, navigate)
          validateForm.resetFields()
          setSeeModal(false)
          setShowValidate(false)
          setParams()
          setEstimateGas()
          navigate(0)
          setSpinning(false)
        } else {
          alert('Wrong Fund Password')
          validateForm.resetFields()
        }
      case 'etr':
        if (isCorrect) {
          setSpinning(true)
          await reduxAction.lockEtr(params, navigate)
          validateForm.resetFields()
          setSeeModal(false)
          setShowValidate(false)
          setParams()
          setEstimateGas()
          navigate(0)
          setSpinning(false)
        } else {
          alert('Wrong Fund Password')
          validateForm.resetFields()
        }
    }
  }

  return (
    <div>
      <Modal
        title="Fund Password validation"
        visible={showValidate}
        onOk={validateForm.submit}
        onCancel={handleCancel}
      >
        <Spin spinning={spinning}>
          <Form.Item>
            <Typography>
              Estimate Gas: {estimateGas}
              <Avatar src="https://img.icons8.com/color/344/ethereum.png" />
            </Typography>
          </Form.Item>

          <Form form={validateForm} onFinish={handleValidation}>
            <Form.Item
              name="fpw"
              label="Fund Password"
              rules={[
                {
                  validator: checkNum,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  )
}

export default ValidateModal
