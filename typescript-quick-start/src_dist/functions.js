"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #####################################################################################################################
var username = getUsername();
var age = 54;
// #####################################################################################################################
function getUsername() {
    return 'lucas';
}
function showPerson(person) {
    console.log(person.name);
    console.log(person.age);
    console.log(person.job);
}
// #####################################################################################################################
exports.default = {
    showPerson: showPerson,
    username: username,
    age: age
};
// #####################################################################################################################
