import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Odrzavanje = new Schema({
    done: {type: Boolean, default: false},
    now: {type: Date, requiered: true},
    finishDate: { type: Date},
    lastVisit: { type: Date},
    area: { type: Number, required: true},
    type: { type: String, required: true},
    text: { type: String, default: ""},
    firm: { type: String, requiered: true},
    username: { type: String, required: true},
    decorator: { type: String, default: ""},
    poolCnt: { type: Number, required: true, default: 0},
    fountainCnt: { type: Number, required: true, default: 0},
    status: { type: String, default: "waiting"},
    timeToFinish: {type: Date}
});

export default mongoose.model("OdrzavanjeModel", Odrzavanje, 'odrzavanja');