import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const organizations = [
  {
    id: "0",
    type: "Restaurant",
    name: "Thalapakati",
    identifiername: "Thalapakati",
    welcomeText: "Welcome to Dindigul Thalapakati",
    password: "madhurai",
    emailid:"techtrio@gmail.com",
    phonenumber: "1234567890"
  },
  {
    id: "1",
    type: "Restaurant",
    name: "Buhari",
    identifiername: "Buhari",
    welcomeText: "Welcome to Buhari",
    password: "Buhari",
    emailid:"techtrio@gmail.com",
    phonenumber: "1234567890"
  },
  {
    id: "2",
    type: "Cinemas",
    name: "Sathyam",
    identifiername: "Sathyam",
    welcomeText: "Welcome to Sathyam Cinemas",
    password: "Sathyam",
    emailid:"techtrio@gmail.com",
    phonenumber: "1234567890"
  },
  {
    id: "3",
    type: "logistics",
    name: "DHL",
    identifiername: "DHL",
    welcomeText: "Welcome to DHL",
    password: "madhurai",
    emailid:"techtrio@gmail.com",
    phonenumber: "1234567890"
  },
  {
    id: "4",
    type: "travels",
    name: "KPN",
    identifiername: "KPN",
    welcomeText: "Welcome to KPN",
    password: "madhurai",
    emailid:"techtrio@gmail.com",
    phonenumber: "1234567890"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (organization) => {
  return replaceAll(organization.name, ' ', '-');
};

class OrganizationApi {
  static getAllOrganizations() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], organizations));
      }, delay);
    });
  }

  static saveOrganization(organization) {
    organization = Object.assign({}, organization); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minOrganizationTitleLength = 1;
        if (organization.type.length < minOrganizationTitleLength) {
          reject(`Type must be at least ${minOrganizationTitleLength} characters.`);
        }

        if (organization.id) {
          const existingOrganizationIndex = organizations.findIndex(a => a.id == organization.id);
          organizations.splice(existingOrganizationIndex, 1, organization);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new organizations in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          organization.id = generateId(organization);
          organization.watchHref = `http://www.host.com/organizations/${organization.id}`;
          organizations.push(organization);
        }

        resolve(organization);
      }, delay);
    });
  }

  static deleteOrganization(organizationId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfOrganizationToDelete = organizations.findIndex(organization => {
          organization.id == organizationId;
        });
        organizations.splice(indexOfOrganizationToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default OrganizationApi;
