import Project from '../models/project';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
/**
 * Get all projects
 * @param req
 * @param res
 * @returns void
 */
export function getProjects(req, res) {
  Project.find({},{projectCode: 1, _id: 0 }).sort('-dateAdded').exec((err, projects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ projects });
  });
}
/**
 * Add Project
 * @param req
 * @param res
 * @returns void
 */
export function addProject(req, res) {
  if (!req.body.issue.project) {
      res.status(403).end();
  }
  
  //If project already exists, return error message

  //const newProject = new Project(req.body.project);

  // newProject.save((err, saved) => {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }
  //   res.json({ project: saved });
  // });
}