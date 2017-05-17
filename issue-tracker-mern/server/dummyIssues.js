import Issue from './models/issue';

export default function () {
  Issue.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis`;

    const content2 = `Lorem ipsum dolor sit amet.`;

    const issue1 = new Issue({
        project: "abc123",
        id: 1, 
        sco: 1, 
        screen: 100, 
        location: "Current Screen",
        summary: "Issue summary 1",
        category: "Functionality",
        description: content1,
        status: "New",
        assigned: "adam.boothroyd@brightwave.co.uk"
    });

    const issue2 = new Issue({ 
        project: "def456",
        id: 2,
        sco: 1, 
        screen: 100, 
        location: "Current Screen",
        summary: "Issue summary 1",
        category: "Functionality",
        description: content1,
        status: "New",
        assigned: "adam.boothroyd@brightwave.co.uk"
    });

    const issue3 = new Issue({ 
        project: "abc123",
        id: 2,
        sco: 2, 
        screen: 110, 
        location: "Current Screen",
        summary: "Issue summary 1",
        category: "Functionality",
        description: content1,
        status: "New",
        assigned: "adam.boothroyd@brightwave.co.uk"
    });

    Issue.create([issue1, issue2, issue3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
