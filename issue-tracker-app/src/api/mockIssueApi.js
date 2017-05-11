import delay from './delay';
import status from '../constants/status';
import location from '../constants/locations';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const issues = [
   {
    "id":"1",
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "location" : location[0],
    "category":"Image",    
    "sco":1,
    "screen":100,
    "summary" : "issue summary",
    "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "status" : status[0],
    "active" : false
   },
   {
    "id":"2",
    "sco":1,
    "screen":110,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Text",
    "description":"Alpaca description",
    "status" : status[0],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"3",
    "sco":1,
    "screen":120,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Design",
    "description":"Badger description",
    "status" : status[2],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"4",
    "sco":1,
    "screen":130,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Functionality",
    "description":"Cat description",
    "status" : status[3],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"5",
    "sco":2,
    "screen":200,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Functionality",
    "description":"Dog description",
    "status" : status[4],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"6",
    "sco":2,
    "screen":110,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Elephant description",
    "status" : status[5],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"7",
    "sco":2,
    "screen":130,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Fox description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"8",
    "sco":2,
    "screen":140,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Gorilla description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"9",
    "sco":3,
    "screen":110,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Horse description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"10",
    "sco":3,
    "screen":120,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Iguana description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"11",
    "sco":3,
    "screen":140,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Jaguar description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"12",
    "sco":3,
    "screen":150,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Krill description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"13",
    "sco":4,
    "screen":110,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Leopard description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"14",
     "sco":4,
    "screen":100,
    "location" : location[1],
    "summary" : "issue summary",
    "category":"Image",
    "description":"Marmaduke description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"15",
    "sco":4,
    "screen":120,
    "location" : location[1],
    "summary" : "issue summary",    
    "category":"Image",
    "description":"Narwhal description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"16",
    "sco":4,
    "screen":100,
    "location" : location[1],
    "summary" : "issue summary",    
    "category":"Image",
    "description":"Orangutan description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"17",
    "sco":4,
    "screen":140,
    "location" : location[1],
    "summary" : "issue summary",  
    "category":"Image",
    "description":"Pangolin description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"18",
    "sco":5,
    "screen":100,
    "location" : location[1],
    "summary" : "issue summary",  
    "category":"Image",
    "description":"Issue description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   },
   {
    "id":"19",
    "sco":5,
    "screen":150,
    "location" : location[1],
    "summary" : "issue summary",  
    "category":"Image",
    "description":"Quoli description",
    "status" : status[6],
    "assigned" : "adam.boothroyd@brightwave.co.uk",
    "active" : false
   }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (issue) => {
  //return replaceAll(issue.description, ' ', '-');
  return parseInt(issues[issues.length - 1].id) + 1;
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
         if(issue.id){
           const existingIssueIndex = issues.findIndex(a => a.id == issue.id);
           issues.splice(existingIssueIndex,1,issue);
         }  else{
           issue.id = generateId(issue);
           issue.status = "New";
           issue.screen = issue.sco + '_' + issue.screen;
           issues.push(issue);
         }
         resolve(issues);
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
