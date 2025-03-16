import express from "express";
import { OwnerController } from "../controllers/owner.controller";

const ownerRouter = express.Router();

ownerRouter.route('/updateUser').post(
    (req,res)=>new OwnerController().update(req, res)
)

ownerRouter.route('/getFirms').get(
    (req,res)=>new OwnerController().getFirms(req, res)
)

ownerRouter.route('/getFirm').post(
    (req,res)=>new OwnerController().getFirm(req, res)
)

ownerRouter.route('/addRenovation').post(
    (req,res)=>new OwnerController().addRenovation(req, res)
)

ownerRouter.route('/getRenovations').post(
    (req,res)=>new OwnerController().getRenovations(req, res)
)

ownerRouter.route('/getFinishedRenovations').post(
    (req,res)=>new OwnerController().getFinishedRenovations(req, res)
)

ownerRouter.route('/addOdrzavanje').post(
    (req,res)=>new OwnerController().addOdrzavanje(req, res)
)

ownerRouter.route('/getWaitingAppo').post(
    (req,res)=>new OwnerController().getWaitingAppo(req, res)
)

export default ownerRouter;