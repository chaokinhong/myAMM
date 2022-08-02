import express from "express";
import {lockUSDT,lockETR,getUsdt,getEtr } from "../controllers/pre.js";

const router = express.Router();

router.put('/lockusdt',lockUSDT)
router.put('/locketr',lockETR)
router.get('/getusdt',getUsdt)
router.get('/getetr',getEtr)

export default router