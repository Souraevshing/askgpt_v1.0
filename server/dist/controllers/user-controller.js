import User from "../models/User.js";
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users: users });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Server error occurred", error: err });
    }
};
export { getAllUsers };
//# sourceMappingURL=user-controller.js.map