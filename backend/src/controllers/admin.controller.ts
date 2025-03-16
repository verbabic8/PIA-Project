import express from 'express';
import UserModel from '../models/user';
import FirmModel from '../models/firma';
import { sha256 } from 'js-sha256';


export class AdminController{
    getAllUsers = (req: express.Request, res: express.Response)=>{
        UserModel.find({ '$or': [{'type': 'owner'},{'type': 'decorator'}]}).then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    getAllFirms = (req: express.Request, res: express.Response)=>{
        FirmModel.find().then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    acceptProfile = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        
        UserModel.updateOne(
            { 'username': username },
            { $set: { 'state': 'active' }}
        ).then((data)=>{
            res.json("ok");
        }).catch(err=>{
            console.log(err)
        })
    }

    declineProfile = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        
        UserModel.updateOne(
            { 'username': username },
            { $set: { 'state': 'declined' }}
        ).then((data)=>{
            res.json("ok");
        }).catch(err=>{
            console.log(err)
        })
    }

    addDecorator = (req: express.Request, res: express.Response)=>{
        var {
            username,
            password,
            firstname,
            lastname,
            gender,
            address,
            phone,
            email,
            picture,
            card,
            type
        } = req.body;
        password = sha256(password);
        if(!picture){
            picture = "data:image/png;base64,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"
        }
        var User = new UserModel({username,password,firstname,lastname,gender,address,phone,email,picture,card,type});
        User.save().then(data =>{
            res.json("ok");
        }).catch(error =>{
            res.json("error");
        })
    }

    getUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.findOne({"username":username}).then((data)=>{
            res.json(data);
        }).catch(err=>{
            console.log(err)
        })
    }

    update = (req: express.Request, res: express.Response)=>{
        var newUser = new UserModel(req.body.user);
        var username = req.body.username;
        UserModel.updateOne({"username":username},{"username":newUser.username,
                                                    "password":sha256(newUser.password),
                                                    "firstname":newUser.firstname,
                                                    "lastname":newUser.lastname,
                                                    "gender":newUser.gender,
                                                    "address":newUser.address,
                                                    "phone":newUser.phone,
                                                    "email":newUser.email,
                                                    "picture":newUser.picture,
                                                    "card":newUser.card,
                                                    "type":newUser.type,
                                                    "state":newUser.state}).then(data=>{
                                                        res.json("ok");
                                                    }).catch(err=>{
                                                        console.log(err)
                                                    })
    }

    addFirm = async (req: express.Request, res: express.Response)=>{
        var body = req.body.firm;
        delete body._id;
        var newFirm = new FirmModel(body);
        for(let user of newFirm.decorators){
            await UserModel.updateOne({"username":user.username},{"firmName":newFirm.name});
        }
        newFirm.decorators.forEach(d =>{
            d.firmName = newFirm.name;
        })
        newFirm.save().then(data =>{
            res.json("ok");
        }).catch(error =>{
            console.log(error);
        })
    }

    getFreeDecorators = (req: express.Request, res: express.Response)=>{
        UserModel.find({"type":'decorator', "state":'active', "haveFirm":false}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    setWorking = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.updateOne({"username":username},{"haveFirm":true}).then(data =>{
            res.json("ok");
        }).catch(error =>{
            res.json("error");
        })
    }
}