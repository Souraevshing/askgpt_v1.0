import { body, validationResult } from "express-validator";
//validating body before sending req for signup
const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must contain at least 8 characters"),
];
//validating response and sending it back to client if there is an error
const validateResponse = (validation) => {
    //return response from this function
    return async (req, res, next) => {
        //iteratiing through array ValidationChain
        for (const validate of validation) {
            //running validation chain
            const result = await validate.run(req);
            //if it doesn't contains err then validation will fail and exit from this loop
            if (!result.isEmpty())
                break;
        }
        //extracts all the errors for the req
        const errors = validationResult(req);
        //if it doesn't contain error then calling next() middleware, else return error to the client
        if (errors.isEmpty()) {
            return next();
        }
        //extract msg property from errors array
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(422).json({ error: errorMessages });
    };
};
export { signUpValidator, validateResponse };
//# sourceMappingURL=signup-validator.js.map