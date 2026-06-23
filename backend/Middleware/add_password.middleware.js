import {z} from "zod";
import User from "../Models/User.js";
const passwordSchema = z.object({
    emailorUsername: z.string(),
    websiteorApp: z.string(),
    password: z.string(),
    Notes: z.string().max(500).optional(),
});

const validateAppPassword = (req,res,next) => {
    
    const result = passwordSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({error: result.error.errors});
    }
    req.body = result.data;
    next();
}

const checkRepeatPassword = async (req,res,next) => {
    try{
        const user = req.session.user.username;
        if (!user) return res.status(401).json({error:"Unauthorized"});
        const UserDoc = await User.findOne({email:user});
        if (!UserDoc) return res.status(404).json({error:"User not found"});
        console.log(UserDoc)
        for (const idx of UserDoc.passwords) {
            const infos = idx.split("_");
            if (req.body.emailorUsername.toLowerCase() === infos[0].toLowerCase() && req.body.websiteorApp.toLowerCase() === infos[1].toLowerCase()) {
                return res.status(400).json({error:"Password for this email/username and website/app already exists",same:true});
            }
        }

        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err});
    }
    
}

export {validateAppPassword,checkRepeatPassword };
