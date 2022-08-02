import { Route, Routes } from 'react-router'
import React from 'react'
import App from './Home'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ConnectWallet from './components/ConnectWallet'
import Market from './components/Market'
import Bank from './components/Bank'
import Pre from './components/Pre'
import Investment from './components/Investment'
import PowerPlant from './components/PowerPlant'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/wallet" element={<ConnectWallet />} />
      <Route path="/market" element={<Market />} />
      <Route path="/bank" element={<Bank />} />
      <Route path="/pre" element={<Pre />} />
      <Route path="/investment" element={<Investment />} />
      <Route path="/powerplant" element={<PowerPlant />} />
    </Routes>
  )
}

export default Router
