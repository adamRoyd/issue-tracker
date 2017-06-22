import Issue from './models/issue';

export default function () {
  Issue.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis`;

    const content2 = `Lorem ipsum dolor sit amet.`;

    const issue1 = new Issue({
        class: "internal",
        project: "abc123",
        id: 1,
        loggedBy: "adam.boothroyd@brightwavegroup.com",
        sco: 1, 
        screen: 100, 
        location: "Current Screen",
        browser: "Firefox",
        category: "Functionality",
        description: content1,
        status: "New",
        area: "internal",
        assigned: "adam.boothroyd@brightwave.co.uk",
        attachments: ["test.png","test.png"],
        type: "Error",
        dateAdded: new Date()
    });

    const issue2 = new Issue({ 
        class: "internal",
        project: "abc123",
        id: 2,
        loggedBy: "adam.boothroyd@brightwavegroup.com",
        sco: 1, 
        screen: 100, 
        location: "Current Screen",
        browser: "Firefox",
        category: "Functionality",
        description: content1,
        status: "New",
        area: "internal",
        assigned: "adam.boothroyd@brightwave.co.uk",
        attachments: ["test.png"],
        type: "Change request",
        dateAdded: new Date()
    });

    const issue3 = new Issue({ 
        class: "client",
        project: "abc123",
        id: 3,
        loggedBy: "adam.boothroyd@brightwavegroup.com",
        sco: 2, 
        screen: 110, 
        location: "Current Screen",
        browser: "Firefox",
        category: "Functionality",
        description: content1,
        status: "New",
        area: "client",
        assigned: "adam.boothroyd@brightwave.co.uk",
        attachments: [],
        dateAdded: new Date()
    });

    Issue.create([issue1, issue2, issue3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
