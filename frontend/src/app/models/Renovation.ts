import { Usluga } from "./Usluga";

export class Renovation{
    _id: string="";
    firm: string="";
    username: string="";
    decorator: string="";
    date: Date = new Date();
    now: Date = new Date();
    finishDate: Date = new Date();
    lastVisit: Date = new Date();
    area: number=0;
    type: string="";
    poolArea: number=0;
    greenArea: number=0;
    tableArea: number=0;
    fountainArea: number=0;
    tables: number=0;
    chairs: number=0;
    usluge: Usluga[] = [];
    text: string="";
    finished: boolean=false;
    poolCnt: number=0;
    fountainCnt: number=0;
    status: string="";
    comment: string="";
}