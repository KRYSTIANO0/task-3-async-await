"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let isLoading = false;
let error;
const companyDiv = document.getElementById("company-list");
// get companies
const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = `http://localhost:3000/companies`;
    let companyList = "";
    let companies;
    try {
        const response = yield fetch(url);
        companies = yield response.json();
        companies.map((companie) => {
            companyList += `<li class="companie">
        <h2>${companie.name}</h2><ul class='users' id="${companie.uri}"></ul></li>`;
        });
    }
    catch (err) {
        error = err;
    }
    companyDiv.innerHTML = companyList;
});
//get users
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = "http://localhost:3000/users";
    let users;
    try {
        const response = yield fetch(url);
        users = yield response.json();
        //send users to their company
        users.map((user) => {
            const companyUsersDiv = document.getElementById(user.uris.company);
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(`${user.name}`));
            companyUsersDiv.appendChild(li);
        });
    }
    catch (err) {
        error = err;
    }
});
//initial function
const initialFunction = () => {
    getCompanies().then(getUsers);
};
//initial state
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        initialFunction();
    }
};
