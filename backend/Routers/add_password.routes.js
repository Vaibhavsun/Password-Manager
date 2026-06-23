import {Router} from "express";
import passwordSc from "../Models/Password.js";
import User from "../Models/User.js";
import {validateAppPassword,checkRepeatPassword } from "../Middleware/add_password.middleware.js";

const AddPasswordRouter = Router();

AddPasswordRouter.post("/add",validateAppPassword,checkRepeatPassword,async (req,res) => {

    try{
    console.log(req.body);
    const user = req.session.user.username;
    console.log(user)
    if (!user) return res.status(401).json({error:"Unauthorized"});

    console.log(req.body);

    const UserDoc = await User.findOne({email:user});
    if (!UserDoc) return res.status(404).json({error:"User not found"});
    if (UserDoc.passwords.length == 100) {
        return res.status(400).json({ error: "Password limit reached (100)" });
    }    
    let SearchTagging = "";
    for (const key in req.body) {
        SearchTagging += req.body[key] + "_";
    }
    const passDoc = await passwordSc.create({...req.body,SearchTagging});
    await User.updateOne(
        {email:user},
        {$push:{passwords:SearchTagging+passDoc._id}}
    )
    return res.status(201).json({message:"Password added successfully"});
        }
catch(err){
    console.log(err);
    return res.status(400).json({error:err});
}
})

AddPasswordRouter.get("/get-passwords",async (req,res) => {
    try{
        const user = req.session.user.username;
        console.log(user)
        if (!user) return res.status(401).json({error:"Unauthorized"});

        const UserDoc = await User.findOne({email:user});
        console.log(UserDoc)
        if (!UserDoc) return res.status(404).json({error:"User not found"});

        const passwords = UserDoc.passwords;
        if (passwords.length == 0) return res.status(200).json({passwords:[]});
        const ids = passwords.map((item) => item.split("_").slice(-1)[0]);
        const AllPasswords = await passwordSc.find({_id:{$in:ids}});
        return res.status(200).json({passwords:AllPasswords});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err});
    }

})

AddPasswordRouter.delete("/delete/:id",async (req,res) => {
    try{
        const user = req.session.user.username;
        console.log(user)
        if (!user) return res.status(401).json({error:"Unauthorized"});
        const UserDoc = await User.findOne({email:user});
        console.log(UserDoc)
        if (!UserDoc) return res.status(404).json({error:"User not found"});
        const passDoc = await passwordSc.findOne({_id:req.params.id});
        if (!passDoc) return res.status(404).json({error:"Password not found"});
        await passwordSc.deleteOne({_id:req.params.id});
        await User.updateOne(
            {email:user},
            {$pull:{passwords:passDoc.SearchTagging+passDoc._id}}
        )
        return res.status(200).json({message:"Password deleted successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err});
    }
})
export default AddPasswordRouter;
