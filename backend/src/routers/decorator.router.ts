import express from "express";
import { DecoratorController } from "../controllers/decorator.controller";

const decoratorRouter = express.Router();

decoratorRouter.route('/updateUser').post(
    (req,res)=>new DecoratorController().update(req, res)
)

decoratorRouter.route('/getFirm').post(
    (req,res)=>new DecoratorController().getFirm(req, res)
)

decoratorRouter.route('/getZakazivanja').post(
    (req,res)=>new DecoratorController().getZakazivanja(req, res)
)

decoratorRouter.route('/getPotvrdjenePoslove').post(
    (req,res)=>new DecoratorController().getPotvrdjenePoslove(req, res)
)

decoratorRouter.route('/acceptRenovation').post(
    (req,res)=>new DecoratorController().acceptRenovation(req, res)
)

decoratorRouter.route('/finishJob').post(
    (req,res)=>new DecoratorController().finishJob(req, res)
)

decoratorRouter.route('/submit').post(
    (req,res)=>new DecoratorController().submit(req, res)
)

decoratorRouter.route('/getOdrzavanja').post(
    (req,res)=>new DecoratorController().getOdrzavanja(req, res)
)

decoratorRouter.route('/acceptOdrzavanje').post(
    (req,res)=>new DecoratorController().acceptOdrzavanje(req, res)
)

decoratorRouter.route('/declineOdrzavanje').post(
    (req,res)=>new DecoratorController().declineOdrzavanje(req, res)
)

decoratorRouter.route('/getBarData').post(
    (req,res)=>new DecoratorController().getBarData(req, res)
)

decoratorRouter.route('/getPieData').post(
    (req,res)=>new DecoratorController().getPieData(req, res)
)

decoratorRouter.route('/getHistogramData').get(
    (req,res)=>new DecoratorController().getHistogramData(req, res)
)

export default decoratorRouter;