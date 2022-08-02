import React from 'react'
import { Menu, Card, Form, Spin } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import Buy from './Buy'
import { Link } from 'react-router-dom'
import ElectricityMarket from './ElectricityMarket'
import { ContractContext } from '../../context'

const Market = () => {
  const [curPage, setCurPage] = React.useState(1)
  const handlePage = (e) => {
    setCurPage(e.key)
  }

  const { spinning } = React.useContext(ContractContext)

  return (
    <div>
      <Menu mode="horizontal" onClick={handlePage} defaultSelectedKeys={1}>
        <Menu.Item key={1} icon={<MailOutlined />}>
          Buy Crypto
        </Menu.Item>
        <Menu.Item key={2} icon={<AppstoreOutlined />}>
          Electricity Market
        </Menu.Item>
        <Menu.Item icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
      <Spin
        spinning={spinning}
        tips="waiting the liquidity reach the target..."
      >
        {curPage == 1 && <Buy />}
        {curPage == 2 && <ElectricityMarket />}
      </Spin>
    </div>
  )
}

export default Market
