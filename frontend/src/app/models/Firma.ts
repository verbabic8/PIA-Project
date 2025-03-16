import {Usluga} from "../models/Usluga"
import { User } from "./User";

export class Firma{
    _id: string="";
    name: string="";
    address: string="";
    usluge: Usluga[] = [];
    location: string="";
    firstname: string="";
    lastname: string="";
    email: string="";
    phone: string="";
    decorators: User[] =[];
    start:  Date = new Date();
    end: Date = new Date();
}