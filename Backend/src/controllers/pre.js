import USDT from '../models/usdt.js'
import ETR from '../models/etr.js'

export const lockUSDT = async (req, res) => {
  const { usdt } = req.body
  const isExits = await USDT.findOne({ mark: 1 })
  console.log(isExits)
  try {
    if (isExits) {
      const total = isExits.usdt + usdt
      console.log(total)
      const updatedStore = await USDT.findOneAndUpdate(
        { mark: 1 },
        { usdt: usdt },
        { new: true },
      )
      res.status(200).json({ usdt: updatedStore })
    } else {
      const newStore = await usdt.create({
        mark: 1,
        usdt: usdt,
      })
      res.status(200).json({ usdt: newStore })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const lockETR = async (req, res) => {
  const { etr } = req.body
  try {
    const isExits = await ETR.findOne({mark:1})
    if (isExits) {
      const updatedStore = await ETR.findOneAndUpdate(
        { mark: 1 },
        { etr: etr },
        { new: true },
      )
      res.status(200).json({ usdt: updatedStore })
    } else {
      const newStore = await ETR.create({
        mark: 1,
        etr: etr,
      })
      res.status(200).json({ usdt: newStore })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const getUsdt = async (req, res) => {
  try {
    const usdt = await USDT.findOne({mark:1})
    console.log(usdt)

    res.status(200).json(usdt)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getEtr = async (req, res) => {
  try {
    const etr = await ETR.findOne({mark:1})
    console.log(etr)

    res.status(200).json(etr)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getKey = async (req, res) => {
  try {
    const key = process.env.OWNER_KEY
    res.status(200).json(key)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}