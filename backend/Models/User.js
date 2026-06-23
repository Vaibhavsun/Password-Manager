import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    passwords:{
        type:[String],
        default: []
        }
})

UserSchema.pre("save",async function(){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,12);
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}
const User = mongoose.model("User",UserSchema)
export default User;