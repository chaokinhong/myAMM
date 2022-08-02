import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    wallet:{type:Buffer,require:true},
    fundPassword:{type:String,require:true},
    id:{type:String}
})

export default mongoose.model('User',userSchema)