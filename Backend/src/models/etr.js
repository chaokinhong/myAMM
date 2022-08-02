import mongoose from "mongoose";


const etrSchema = mongoose.Schema({
    mark:{type:Number},
    etr:{type:Number,require:true},
})

export default mongoose.model('ETR',etrSchema)