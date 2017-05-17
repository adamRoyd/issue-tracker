import Comment from './models/comment';

export default function () {
  Comment.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const comment1 = new Comment({ text:'Lorem ipsum comment 1',user:'adam.boothroyd@brightwave.co.uk',time : new Date()});
    const comment2 = new Comment({ text:'Lorem ipsum comment 2',user:'adam.boothroyd@brightwave.co.uk',time : new Date()});
    const comment3 = new Comment({ text:'Lorem ipsum comment 3',user:'adam.boothroyd@brightwave.co.uk',time: new Date()});

    Comment.create([comment1, comment2, comment3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
