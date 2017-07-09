import Comment from './models/comment';

export default function () {
  Comment.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const comment1 = new Comment({ project:'abc123', issueId: 1, text:'Lorem ipsum comment 1',user:'adam.boothroyd@brightwave.co.uk',status:'New',time : new Date()});
    const comment2 = new Comment({ project:'abc123', issueId: 2, text:'Lorem ipsum comment 2',user:'adam.boothroyd@brightwave.co.uk',status:'New',time : new Date()});
    const comment3 = new Comment({ project:'def456', issueId: 1, text:'Lorem ipsum comment 3',user:'adam.boothroyd@brightwave.co.uk',status:'New',time: new Date()});

    Comment.create([comment1, comment2, comment3], (error) => {
      if (!error) {

      }
    });
  });
}
