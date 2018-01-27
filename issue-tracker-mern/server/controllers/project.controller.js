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
  Project.find({}, { projectCode: 1, _id: 0 }).sort({ projectCode: 1 }).exec((err, projects) => {
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
export async function addProject(req, res) {
  if (!req.body.project) {
    res.status(403).end();
  }
  const p = await Project.find({ projectCode: req.body.project });
  if (p.length > 0) {
    res.status(400).send({ message: 'A project already exists with that code. Please try again.' });
  } else {
    const newProject = new Project({ projectCode: req.body.project });
    newProject.projectCode = sanitizeHtml(newProject.projectCode);

    newProject.save((err, saved) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        project: saved,
        message: `New project ${saved.projectCode} created`
      });
    });
  }
}