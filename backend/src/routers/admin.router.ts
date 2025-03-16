import express from "express";
import { AdminController } from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter.route('/getAllUsers').get(
    (req,res)=>new AdminController().getAllUsers(req, res)
)

adminRouter.route('/getAllFirms').get(
    (req,res)=>new AdminController().getAllFirms(req, res)
)

adminRouter.route('/acceptProfile').post(
    (req,res)=>new AdminController().acceptProfile(req, res)
)

adminRouter.route('/declineProfile').post(
    (req,res)=>new AdminController().declineProfile(req, res)
)

adminRouter.route('/addDecorator').post(
    (req,res)=>new AdminController().addDecorator(req, res)
)

adminRouter.route('/editUser').post(
    (req,res)=>new AdminController().getUser(req, res)
)

adminRouter.route('/updateUser').post(
    (req,res)=>new AdminController().update(req, res)
)

adminRouter.route('/addFirm').post(
    (req,res)=>new AdminController().addFirm(req, res)
)

adminRouter.route('/getFreeDecorators').get(
    (req,res)=>new AdminController().getFreeDecorators(req, res)
)

adminRouter.route('/setWorking').post(
    (req,res)=>new AdminController().setWorking(req, res)
)

export default adminRouter;