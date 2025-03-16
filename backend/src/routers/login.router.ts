import express from "express";
import { LoginController } from "../controllers/login.controller";

const loginRouter = express.Router();

loginRouter.route('/login').post(
    (req,res)=>new LoginController().login(req, res)
)

loginRouter.route('/loginAdmin').post(
    (req,res)=>new LoginController().loginAdmin(req, res)
)

loginRouter.route('/register').post(
    (req,res)=>new LoginController().register(req, res)
)

loginRouter.route('/change').post(
    (req,res)=>new LoginController().changePassword(req, res)
)

loginRouter.route('/getOwnerCount').get(
    (req,res)=>new LoginController().getOwnerCount(req, res)
)

loginRouter.route('/get24jobCount').get(
    (req,res)=>new LoginController().get24jobCount(req, res)
)

loginRouter.route('/get7jobCount').get(
    (req,res)=>new LoginController().get7jobCount(req, res)
)

loginRouter.route('/get30jobCount').get(
    (req,res)=>new LoginController().get30jobCount(req, res)
)

loginRouter.route('/getDecoratorCount').get(
    (req,res)=>new LoginController().getDecoratorCount(req, res)
)

loginRouter.route('/getGardenCount').get(
    (req,res)=>new LoginController().getGardenCount(req, res)
)

loginRouter.route('/getFirms').get(
    (req,res)=>new LoginController().getFirms(req, res)
)

export default loginRouter;