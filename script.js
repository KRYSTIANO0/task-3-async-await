let error = "";
let isLoading = false;

const companyDiv = document.getElementById("company-list");

// get companies
const getCompanies = async () => {
  let url = `http://localhost:3000/companies`;
  let companyList = "";
  try {
    const response = await fetch(url);
    const companies = await response.json();
    companies.map((companie) => {
      companyList += `<li class="companie">
        <h2>${companie.name}</h2><ul class='users' id="${companie.uri}"></ul></li>`;
    });
  } catch (err) {
    error = err;
  }
  companyDiv.innerHTML = companyList;
};

//get users
const getUsers = async () => {
  let url = "http://localhost:3000/users";
  try {
    const response = await fetch(url);
    const users = await response.json();
    //send users to their company
    users.map((user) => {
      const companyUsersDiv = document.getElementById(user.uris.company);
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(`${user.name}`));
      companyUsersDiv.appendChild(li);
    });
  } catch (err) {
    error = err;
  }
};
//initial function
const initialFunction = () => {
  getCompanies().then(getUsers);
};

window.onload = initialFunction();
