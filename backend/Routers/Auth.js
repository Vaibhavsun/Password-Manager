import {Router} from "express";
import validate from "../Middleware/Auth.js";
import User from "../Models/User.js";
import logger from "../logging.js";
const AuthRouter = Router();

AuthRouter.post("/register",validate,async (req,res) => {
    const user = req.body;
    try{
        await User.create(user);
        req.session.user = {username:user.email};
        logger.info("User registered successfully", { user });
        return res.status(201).json({message:"User registered successfully", user});
    }
    catch(err){
        console.log(err)
        logger.error("User registration failed", { error: err });
        return res.status(400).json({ error: err });
    }

})

AuthRouter.post("/login",validate,(req,res) => {
    const {email,password} = req.body;
    User.findOne({email}).then((user) => {
        user.comparePassword(password).then((isMatch) => {

            if (!isMatch) return res.status(400).json({error:"Invalid credentials"});
            req.session.user = {username:email};
            logger.info("Login successful", { user });
            return res.status(200).json({message:"Login successful", user});
        }).catch((err) => {
            logger.error("Login failed", { error: err });
            return res.status(400).json({error: err});
        });
    })


})

AuthRouter.delete("/delete",validate,(req,res) => {
    const {email,password} = req.body;
    User.findOne({email}).then((user) => {
        user.comparePassword(password).then((isMatch) => {
            if (!isMatch) return res.status(400).json({error:"Invalid credentials"});
            User.deleteOne({email}).then(() => {
                logger.info("User deleted successfully", { email });
                return res.status(200).json({message:"User deleted successfully"});
            }).catch((err) => {
                console.log(err)
                logger.error("User deletion failed", { error: err });
                return res.status(400).json({error: err});
            });
        }).catch((err) => {
            console.log(err)
            logger.error("User deletion failed", { error: err });
            return res.status(400).json({error: err});
        });
    })


})

AuthRouter.get("/check-session", (req, res) => {
    if (req.session && req.session.user) {
        logger.info("Session check successful", { session: req.session.user });
        res.status(200).json({ user: req.session.user });
    } else {
        logger.error("Session check failed");
        res.status(401).json({ error: "Unauthorized" });
    }
})

AuthRouter.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            logger.error("Logout failed", { error: err });
            return res.status(400).json({ error: err });
        }
        logger.info("Logout successful");
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logout successful" });
    });
})

AuthRouter.get("/get-user", (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ user: req.session.user });
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
})

AuthRouter.get("/get-search-tags",async (req,res) => {
    try {
    const user = req.session.user.username;
    if (!user) return res.status(401).json({error:"Unauthorized"});
    const UserDoc = await User.findOne({email:user});
    console.log(user,UserDoc)
    if (!UserDoc) return res.status(404).json({error:"User not found"});
    return res.status(200).json({searchTags:UserDoc.passwords});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err});
    }
})
export default AuthRouter;

