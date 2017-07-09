import Assignee from './models/assignee';

export default function () {
  Assignee.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const assignee1 = new Assignee({ assignee:'adam.boothroyd@brightwave.co.uk'});
    const assignee2 = new Assignee({ assignee:'simon.hollobon@brightwave.co.uk'});

    Assignee.create([assignee1, assignee2], (error) => {
      if (!error) {

      }
    });
  });
}
