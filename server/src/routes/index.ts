import { Router } from "express";

import userRoutes from "./user-route.js";
import chatRoutes from "./chats-route.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/users/chats", chatRoutes);

export default router;
