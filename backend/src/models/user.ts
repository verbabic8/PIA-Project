import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ['M', 'Z'], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String, required: true},
    card: { type: String, required: true },
    type: { type: String, enum: ['decorator', 'owner', 'admin'], required: true },
    state: { type: String, default: "waiting"},
    haveFirm: {type: Boolean, default: false},
    isWorking: {type: Boolean, default: false},
    firmName: { type: String, default: "" },
});

export default mongoose.model("UserModel", User, 'users');