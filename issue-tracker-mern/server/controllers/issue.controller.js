import Issue from '../models/issue';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all issues
 * @param req
 * @param res
 * @returns void
 */
export function getIssues(req, res) {
  Issue.find().sort('-dateAdded').exec((err, issues) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ issues });
  });
}

/**
 * Save an issue
 * @param req
 * @param res
 * @returns void
 */
export function addIssue(req, res) {
  if (!req.body.issue.name || !req.body.issue.title || !req.body.issue.content) {
    res.status(403).end();
  }

  const newIssue = new Issue(req.body.issue);

  // Let's sanitize inputs
  newIssue.title = sanitizeHtml(newIssue.title);
  newIssue.name = sanitizeHtml(newIssue.name);
  newIssue.content = sanitizeHtml(newIssue.content);

  newIssue.slug = slug(newIssue.title.toLowerCase(), { lowercase: true });
  newIssue.cuid = cuid();
  newIssue.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ issue: saved });
  });
}

/**
 * Get a single issue
 * @param req
 * @param res
 * @returns void
 */
export function getIssue(req, res) {
  Issue.findOne({ cuid: req.params.cuid }).exec((err, issue) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ issue });
  });
}

/**
 * Delete a issue
 * @param req
 * @param res
 * @returns void
 */
export function deleteIssue(req, res) {
  Issue.findOne({ cuid: req.params.cuid }).exec((err, issue) => {
    if (err) {
      res.status(500).send(err);
    }

    issue.remove(() => {
      res.status(200).end();
    });
  });
}

