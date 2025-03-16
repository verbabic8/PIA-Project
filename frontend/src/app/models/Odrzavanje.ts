import { Firma } from "./Firma";

export class Odrzavanje{
    _id: string="";
    now: Date = new Date();
    status: string="";
    timeToFinish: Date = new Date();
    firm: string="";
    username: string="";
    decorator: string="";
    finishDate: Date = new Date();
    lastVisit: Date = new Date();
    text: string="";
    poolCnt: number=0;
    fountainCnt: number=0;
    type: string="";
    area: number=0;
    done: boolean=false;
}