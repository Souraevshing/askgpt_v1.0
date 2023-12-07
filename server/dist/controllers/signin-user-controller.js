import * as bcrypt from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/create-token.js";
import { COOKIE_NAME } from "../utils/constants.js";
const signInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(403).send("Incorrect email or password");
        }
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
        return res.status(200).json({ message: "OK" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Server error occurred", error: err });
    }
};
export { signInUser };
//# sourceMappingURL=signin-user-controller.js.map