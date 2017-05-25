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
  Issue.find({project: req.params.projectCode}).sort( { id: 1 } ).exec((err, issues) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ issues });
  });
}

/**
 * Add an issue
 * @param req
 * @param res
 * @returns void
 */
export function addIssue(req, res) {
  if (!req.body.issue.id) {
    res.status(403).end();
  }
  const newIssue = new Issue(req.body.issue);
  // Let's sanitize inputs
  newIssue.project = sanitizeHtml(newIssue.project);
  newIssue.id = sanitizeHtml(newIssue.id);
  newIssue.location = sanitizeHtml(newIssue.location);
  newIssue.sco = sanitizeHtml(newIssue.sco);
  newIssue.screen = sanitizeHtml(newIssue.screen);
  newIssue.category = sanitizeHtml(newIssue.category);
  newIssue.assigned = sanitizeHtml(newIssue.assigned);
  newIssue.description = sanitizeHtml(newIssue.description);
  newIssue.browser = sanitizeHtml(newIssue.browser);
  newIssue.status = sanitizeHtml(newIssue.status);
  newIssue.dateAdded = sanitizeHtml(newIssue.dateAdded);
  
  newIssue.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
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
 * Save issue
 * @param req
 * @param res
 * @returns void
 */
export function saveIssue(req, res) {
  const issueToSave = req.body.issue
  Issue.findOneAndUpdate(
    { id: issueToSave.id },
    { $set: {
        assigned : issueToSave.assigned,
        status : issueToSave.status,
        location : issueToSave.location,
        sco : issueToSave.sco,
        screen: issueToSave.screen,
        category: issueToSave.category
      } 
    },
    { new : true }
  ).exec((err, issue) => {
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
/**
 * Batch issues
 * @param req
 * @param res
 * @returns void
 */
export function batchIssues(req, res) {
  console.log('BATCH ISSUES CONTROLLER');
  const issuesToSave = req.body.issues
  const batchOptions = req.body.batchOptions
  Issue.findAndModify({ 
      query : {id: 1},
      sort : {id: 1},
      update: {$set: {assigned : "works"}},
      upsert: true 
  }).exec((err, issues) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ issues });
  });
}

