import { Router } from "express";

import { getAllUsers } from "../controllers/user-controller.js";
import { signUpUser } from "../controllers/signup-user-controller.js";
import { signInUser } from "../controllers/signin-user-controller.js";
import {
  signUpValidator,
  validateResponse,
} from "../utils/signup-validator.js";
import { signInValidator } from "../utils/signin-validator.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validateResponse(signUpValidator), signUpUser);
userRoutes.post("/signin", validateResponse(signInValidator), signInUser);

export default userRoutes;
