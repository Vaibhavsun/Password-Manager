import mongoose from "mongoose";
import { email } from "zod";

const passwordSchema = new mongoose.Schema({
    emailorUsername:{
        type:String,
        required:true,
        trim:true
    },
    websiteorApp:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    Notes:{
        type:String,
        default:""
    },
    SearchTagging:{
        type:String
    }
})
const passwordSc = mongoose.model("Password",passwordSchema)
export default passwordSc;
