"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #####################################################################################################################
var express_1 = __importDefault(require("express"));
var functions_js_1 = __importDefault(require("./functions.js"));
// #####################################################################################################################
var app = express_1.default();
var PORT = process.env.PORT || 3333;
// #####################################################################################################################
app.get('/', function (req, res) {
    return res.send('hello word 2 kk dkk 45');
});
functions_js_1.default.showPerson({ name: "Lucas", age: 23, job: { salary: 12000, enterprise: "appsuper" } });
console.log(functions_js_1.default.age);
console.log(functions_js_1.default.username);
// #####################################################################################################################
app.listen(PORT);
// #####################################################################################################################
