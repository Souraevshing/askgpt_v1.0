import { body, validationResult } from "express-validator";
//validating body before sending req for signup
const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .notEmpty()
        .withMessage("Password is required")
        .withMessage("Password must contain at least 8 characters"),
];
//validating response and sending it back to client if there is an error
const validateResponse = (validation) => {
    return async (req, res, next) => {
        for (const validate of validation) {
            const result = await validate.run(req);
            if (!result.isEmpty())
                break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty())
            return next();
        return res.status(422).json({ error: errors.array() });
    };
};
export { signUpValidator, validateResponse };
//# sourceMappingURL=signup-validators.js.map