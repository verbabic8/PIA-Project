import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Usluga = new Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true}
});

export default mongoose.model("UslugaModel", Usluga);