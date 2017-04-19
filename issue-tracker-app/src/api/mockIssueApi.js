import delay from './delay';
import status from '../constants/status';
import users from '../constants/users';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const issues = [
   {
    "code":"46hshdhy",
    "id":"1",
    "screen":"1_100",
    "category":"Image",
    "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "status" : status[0],
    "assigned" : users[0],
    "active" : false
   },
   {
    "code":"sergtsegs",
    "id":"2",
    "screen":"2_100",
    "category":"Text",
    "description":"Issue description",
    "status" : status[1],
    "assigned" : users[0],
    "active" : false
   },
   {
    "code":"htrdht",
    "id":"3",
    "screen":"3_100",
    "category":"Design",
    "description":"Issue description",
    "status" : status[2],
    "assigned" : users[0],
    "active" : false
   },
   {
    "code":"dtndtyndt",
    "id":"4",
    "screen":"4_100",
    "category":"Functionality",
    "description":"Issue description",
    "status" : status[3],
    "assigned" : users[0],
    "active" : false
   },
   {
    "code":"tsjyjyj",
    "id":"5",
    "screen":"3_100",
    "category":"Functionality",
    "description":"Issue description",
    "status" : status[4],
    "assigned" : users[0],
    "active" : false
   },
   {
    "code":"dxrynn",
    "id":"6",
    "screen":"2_100",
    "category":"Image",
    "description":"Issue description",
    "status" : status[5],
    "assigned" : users[0],
    "active" : false
   },
   {
    "code":"sdfsdfsdf",
    "id":"7",
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
  return replaceAll(issue.title, ' ', '-');
};

class IssueApi {
  static getAllIssues() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], issues));
      }, delay);
    });
  }

  static saveIssue(issue) {
    issue = Object.assign({}, issue); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minIssueTitleLength = 1;
        if (issue.title.length < minIssueTitleLength) {
          reject(`Title must be at least ${minIssueTitleLength} characters.`);
        }

        if (issue.id) {
          const existingIssueIndex = issues.findIndex(a => a.id == issue.id);
          issues.splice(existingIssueIndex, 1, issue);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new issues in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          issue.id = generateId(issue);
          issue.watchHref = `http://www.pluralsight.com/issues/${issue.id}`;
          issues.push(issue);
        }

        resolve(issue);
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
