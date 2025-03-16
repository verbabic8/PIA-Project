import mongoose from "mongoose";
import UslugaModel from "../models/usluga"
import FirmaModel from "../models/firma"

const Schema = mongoose.Schema;

let Renovation = new Schema({
    date: { type: Date, required: true},
    now: { type: Date, required: true},
    finishDate: { type: Date},
    lastVisit: { type: Date},
    area: { type: Number, required: true},
    type: { type: String, required: true},
    poolArea: { type: Number, required: true, default: 0},
    greenArea: { type: Number, required: true, default: 0},
    tableArea: { type: Number, required: true, default: 0},
    fountainArea: { type: Number, required: true, default: 0},
    tables: { type: Number, required: true, default: 0},
    chairs: { type: Number, required: true, default: 0},
    usluge: { type: [UslugaModel.schema], required: true},
    text: { type: String, default: ""},
    firm: { type: String, requiered: true},
    finished: { type: Boolean, default: false},
    username: { type: String, required: true},
    decorator: { type: String, default: ""},
    poolCnt: { type: Number, required: true, default: 0},
    fountainCnt: { type: Number, required: true, default: 0},
    status: { type: String, default: "waiting"},
    comment: { type: String, default: ""},
});

export default mongoose.model("RenovationModel", Renovation, 'renovations');