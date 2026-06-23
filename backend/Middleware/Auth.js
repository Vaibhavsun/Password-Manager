import {z} from "zod";
import logger from "../logging.js";
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

const validate = (req,res,next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        logger.error("Validation failed", { errors: result.error.errors });
        return res.status(400).json({error: result.error.errors});
    }
    logger.info("Validation successful", { data: result.data });
    req.body = result.data;
    next();
};

export default validate;


