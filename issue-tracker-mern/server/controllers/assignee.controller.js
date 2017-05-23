import Assignee from '../models/assignee';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getAssignees(req, res) {
  Assignee.find({},{ _id : 0, assignee: 1 }).sort( {assignee : 1} ).exec((err, assignees) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ assignees });
  });
}