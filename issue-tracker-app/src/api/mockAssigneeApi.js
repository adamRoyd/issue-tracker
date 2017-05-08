import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const assignees = [
    "adam.boothroyd@brightwave.co.uk",
    "Simon Hollobon",
    "Joe Bloggs"
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (assignee) => {
  return replaceAll(assignee.title, ' ', '-');
};

class AssigneeApi {
  static getAllAssignees() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], assignees));
      }, delay);
    });
  }


}

export default AssigneeApi;
