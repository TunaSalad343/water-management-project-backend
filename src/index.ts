import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createAccount } from "./createAccount";
import { addPeopleToAccount } from "./addPeopleToAccount";
import { printBill } from "./printBill";

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();

app.post("/water-accounts", jsonParser, createAccount());

app.put("/water-accounts/:accountID", jsonParser, addPeopleToAccount());

app.get("/water-accounts/:accountID/bill", jsonParser, printBill());

app.listen(81, function () {
  console.log("CORS-enabled web server listening on port 81");
});