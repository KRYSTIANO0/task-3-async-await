let isLoading = false;
let error: unknown;

const companyDiv = document.getElementById("company-list")!;

// get companies
const getCompanies = async (): Promise<void> => {
  let url = `http://localhost:3000/companies`;
  let companyList = "";
  let companies: { name: string; uri: string }[];

  try {
    const response = await fetch(url);
    companies = await response.json();
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
const getUsers = async (): Promise<void> => {
  let url = "http://localhost:3000/users";
  let users: {
    name: string;
    uri: string;
    email: string;
    uris: { company: string };
  }[];

  try {
    const response = await fetch(url);
    users = await response.json();
    //send users to their company
    users.map((user) => {
      const companyUsersDiv = document.getElementById(user.uris.company)!;
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(`${user.name}`));
      companyUsersDiv.appendChild(li);
    });
  } catch (err) {
    error = err;
  }
};
//initial function
const initialFunction = (): void => {
  getCompanies().then(getUsers);
};

//initial state
document.onreadystatechange = (): void => {
  if (document.readyState === "complete") {
    initialFunction();
  }
};
