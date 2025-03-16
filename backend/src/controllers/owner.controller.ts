import express from 'express';
import UserModel from '../models/user';
import FirmModel from '../models/firma';
import RenovationModel from '../models/renovation';
import OdrzavanjeModel from '../models/odrzavanje';


export class OwnerController{

    update = (req: express.Request, res: express.Response)=>{
        var newUser = new UserModel(req.body.user);
        var username = req.body.username;
        UserModel.updateOne({"username":username},{"firstname":newUser.firstname,
                                                    "lastname":newUser.lastname,
                                                    "address":newUser.address,
                                                    "phone":newUser.phone,
                                                    "email":newUser.email,
                                                    "picture":newUser.picture,
                                                    "card":newUser.card,}).then(data=>{
                                                        UserModel.findOne({"username":username}).then(data=>{
                                                            res.json(data);
                                                        }).catch(err=>{
                                                            console.log(err)
                                                        })
                                                    }).catch(err=>{
                                                        console.log(err)
                                                    })
    }

    getFirms = (req: express.Request, res: express.Response)=>{
        FirmModel.find().then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    getFirm = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        FirmModel.findOne({"name":name}).then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    addRenovation = (req: express.Request, res: express.Response)=>{
        var body = req.body.renovation;
        delete body._id;
        var newRenovation = new RenovationModel(body);
        newRenovation.save().then(data =>{
            res.json("ok");
        }).catch(error =>{
            console.log(error);
        })
    }

    getRenovations = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        RenovationModel.find({"username":username, "finished": false}).then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    getFinishedRenovations = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        RenovationModel.find({"username":username, "finished": true, "status":"accepted"}).then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    addOdrzavanje = (req: express.Request, res: express.Response)=>{
        var body = req.body.odrzavanje;
        delete body._id;
        var newOdrzavanje = new OdrzavanjeModel(body);
        var firm = new FirmModel();
        var now = new Date();
        FirmModel.findOne({"name":newOdrzavanje.firm}).then(data =>{
            if(data) firm = data;
            if(new Date(firm.start).getTime() <= now.getTime() && new Date(firm.end).getTime() >= now.getTime()){
                res.json("godisnji")
            }
            else{
                RenovationModel.updateOne({"username":newOdrzavanje.username, "area": newOdrzavanje.area, "firm":newOdrzavanje.firm, "type":newOdrzavanje.type, "finished": true}, {"status":"waiting"}).then(data =>{
                    newOdrzavanje.status="waiting";
                    newOdrzavanje.save().then(data =>{
                        res.json("ok");
                    }).catch(error =>{
                        console.log(error);
                    })
                }).catch(error =>{
                    console.log(error);
                })
            }
        }).catch(error =>{
            console.log(error);
        })
    }

    getWaitingAppo = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        OdrzavanjeModel.find({"username":username, "done": false}).then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }
}