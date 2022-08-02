import mongoose from "mongoose";


const usdtSchema = mongoose.Schema({
    mark:{type:Number},
    usdt:{type:Number,require:true},
})

export default mongoose.model('USDT',usdtSchema)