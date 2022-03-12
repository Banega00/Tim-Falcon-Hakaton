import { UserController } from './../api/user.controller.';
import express from "express";

const router = express.Router()

const userController = new UserController()

router.get("/users", userController.getAllUsers)
router.get("/user/:id", userController.getUserById)
router.delete("/user/:id", userController.deleteUserById)

export const UserRouter = router;