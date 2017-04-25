import delay from './delay';
import status from '../constants/status';
import users from '../constants/users';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const issues = [
   {
    "id":"1",
    "screen":"1_100",
    "category":"Image",
    "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "status" : status[0],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"2",
    "screen":"2_100",
    "category":"Text",
    "description":"Issue description",
    "status" : status[1],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"3",
    "screen":"3_100",
    "category":"Design",
    "description":"Issue description",
    "status" : status[2],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"4",
    "screen":"4_100",
    "category":"Functionality",
    "description":"Issue description",
    "status" : status[3],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"5",
    "screen":"3_100",
    "category":"Functionality",
    "description":"Issue description",
    "status" : status[4],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"6",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[5],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"7",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"8",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"9",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"10",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"11",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"12",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"13",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"14",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"15",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"16",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"17",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"18",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"19",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"20",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"21",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"22",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"23",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"24",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"25",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"26",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"27",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"28",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   },
   {
    "id":"29",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : users[0],
    "active" : false
   }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (issue) => {
  return replaceAll(issue.description, ' ', '-');
};

class IssueApi {
  static getAllIssues() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], issues));
      }, delay);
    });
  }

  static saveIssue(id,status) {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          let issue = issues.filter(k => k.id == id);
          Object.assign({}, issue, issue.status = status);

          console.log(issue);
          const issueIndex = issues.findIndex(a => a.id == id);
          issues.splice(issueIndex, 1, issue);
          console.log(issues);
          resolve(Object.assign([], issues));
      }, delay);
    });
  }

  static deleteIssue(issueId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfIssueToDelete = issues.findIndex(issue => {
          issue.id == issueId;
        });
        issues.splice(indexOfIssueToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default IssueApi;
