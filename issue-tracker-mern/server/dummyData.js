import Project from './models/project';

export default function () {
  Project.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const projectCode1 = new Project({ projectCode: 'abc123'});
    const projectCode2 = new Project({ projectCode: 'def456'});

    Project.create([projectCode1, projectCode2], (error) => {
      if (!error) {

      }
    });
  });
}
