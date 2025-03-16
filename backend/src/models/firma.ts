import mongoose from "mongoose";
import UslugaModel from "./usluga";
import UserModel from "./user";

const Schema = mongoose.Schema;

let Firma = new Schema({
    name: { type: String, required: true, unique: true},
    address: { type: String, required: true},
    usluge: {type: [UslugaModel.schema], default: []},
    location: { type: String, },
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    decorators: {type: [UserModel.schema], default: []},
    start: { type: Date, required: true},
    end: { type: Date, required: true},
});

export default mongoose.model("FirmaModel", Firma, 'firms');