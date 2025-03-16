import express from 'express';
import UserModel from '../models/user';
import FirmaModel from '../models/firma';
import RenovationModel from '../models/renovation';
import OdrzavanjeModel from '../models/odrzavanje';


export class DecoratorController{

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

    getFirm = (req: express.Request, res: express.Response)=>{
        let firmName = req.body.firmName;
        FirmaModel.findOne({"name":firmName}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    getZakazivanja = (req: express.Request, res: express.Response)=>{
        let firmName = req.body.firmName;
        RenovationModel.find({"firm":firmName, "finished":false, "status": "waiting"}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }
    
    getPotvrdjenePoslove = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        RenovationModel.find({"decorator":username, "finished":false}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    acceptRenovation = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let id = req.body.id;
        RenovationModel.findByIdAndUpdate(id, { "decorator":username, "status": "accepted"}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    finishJob = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let id = req.body.id;
        let newDate = new Date();
        RenovationModel.findByIdAndUpdate(id, {"finished": true, "finishDate":newDate, "lastVisit":newDate}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    submit = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let id = req.body.id;
        let comment = req.body.comment;
        RenovationModel.findByIdAndUpdate(id, {"decorator":username, "status":"declined", "comment":comment}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    getOdrzavanja = (req: express.Request, res: express.Response)=>{
        let firmName = req.body.firmName;
        OdrzavanjeModel.find({"firm":firmName, "status": "waiting"}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    acceptOdrzavanje = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let date = req.body.date;
        OdrzavanjeModel.findByIdAndUpdate(id, { "status": "accepted", "timeToFinish":date}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    declineOdrzavanje = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        OdrzavanjeModel.findByIdAndUpdate(id, { "status":"declined"}).then(data =>{
            res.json(data);
        }).catch(error =>{
            res.json("error");
        })
    }

    getBarData = async (req: express.Request, res: express.Response)=>{
        const username = req.body.username;

        try {
            const renovationAggregation = RenovationModel.aggregate([
                { $match: { decorator: username } },
                {
                    $group: {
                        _id: { month: { $month: "$date" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        count: 1
                    }
                }
            ]);

            const odrzavanjeAggregation = OdrzavanjeModel.aggregate([
                { $match: { decorator: username } },
                {
                    $group: {
                        _id: { month: { $month: "$now" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        count: 1
                    }
                }
            ]);

            const [renovationResults, odrzavanjeResults] = await Promise.all([renovationAggregation, odrzavanjeAggregation]);

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const jobCounts = Array(12).fill(0);

            renovationResults.forEach(result => {
                jobCounts[result.month - 1] += result.count; // Adjust for zero-indexed months
            });

            odrzavanjeResults.forEach(result => {
                jobCounts[result.month - 1] += result.count; // Adjust for zero-indexed months
            });

            const results = jobCounts.map((count, index) => ({
                month: monthNames[index],
                jobCount: count
            }));

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json("error");
        }
    }

    getPieData = (req: express.Request, res: express.Response)=>{
        let firm = req.body.firm;
        Promise.all([
            RenovationModel.find({ firm: firm }),
            OdrzavanjeModel.find({ firm: firm })
        ]).then(([renovationJobs, odrzavanjeJobs]) => {
            const jobCounts: { [key: string]: number } = {};

            // Count jobs for each decorator in RenovationModel
            renovationJobs.forEach(job => {
                if (job.decorator in jobCounts) {
                    jobCounts[job.decorator]++;
                } else {
                    jobCounts[job.decorator] = 1;
                }
            });

            // Count jobs for each decorator in OdrzavanjeModel
            odrzavanjeJobs.forEach(job => {
                if (job.decorator in jobCounts) {
                    jobCounts[job.decorator]++;
                } else {
                    jobCounts[job.decorator] = 1;
                }
            });

            const labels = Object.keys(jobCounts);
            const data = Object.values(jobCounts);

            res.json({ labels, data });
        }).catch(error => {
            res.json("error");
        });
    }

    getHistogramData = async (req: express.Request, res: express.Response)=>{
        try {
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

            let data = new Array(7).fill(0);
            // Fetch jobs from both models
            const [renovationJobs, odrzavanjeJobs] = await Promise.all([
                RenovationModel.find({ date: { $gte: twoYearsAgo } }),
                OdrzavanjeModel.find({ now: { $gte: twoYearsAgo } })
            ]);

            // Aggregate jobs by day of the week
            renovationJobs.forEach((job: any) => {
                data[new Date(job.date).getDay()]++;
            });

            odrzavanjeJobs.forEach((job: any) => {
                data[new Date(job.now).getDay()]++;
            });

            // Divide the counts by the number of occurrences of each day (104 weeks in 2 years)
            for (let i = 0; i < 7; i++) {
                data[i] = data[i] / 104;
            }

            // Prepare the response data
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const result = data.map((count, index) => ({
                day: daysOfWeek[index],
                averageJobs: count
            }));

            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json("error");
        }
    }
}