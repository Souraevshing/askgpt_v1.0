import * as bcrypt from "bcrypt";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/create-token.js";
const signUpUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(401).send("User already registered");
        }
        //hashing password
        const hashedPassword = await bcrypt.hash(password, 11);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        //clearing cookie before user signin everytime
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        //generating token when login
        const token = createToken(user._id.toString(), user.email, "1d");
        //setting expiration time to 1 Day
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        //setting cookie properties
        res.cookie(COOKIE_NAME, token, {
            expires,
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "User created" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Server error occurred", error: err });
    }
};
export { signUpUser };
//# sourceMappingURL=signup-user-controller.js.map