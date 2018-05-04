import Issue from '../models/issue';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import mail from '../handlers/mail';

/**
 * Get all issues by project
 * @param req
 * @param res
 * @returns void
 */
export function getIssues(req, res) {
    Issue.find({ project: req.params.projectCode }).sort({ id: 1 }).exec((err, issues) => {
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
export async function addIssue(req, res) {
    if (!req.body.issue.project) {
        res.status(403).end();
    }
    // get the issue with max id
    const i = await Issue.find({ project: req.body.issue.project }).sort({ id: -1 }).limit(1);
    let newId = 1;
    if (i.length != 0) {
        newId = i[0].id + 1;
    }
    const newIssue = new Issue(req.body.issue);
    // Let's sanitize inputs
    newIssue.class = sanitizeHtml(newIssue.class);
    newIssue.project = sanitizeHtml(newIssue.project);
    newIssue.id = newId;
    newIssue.loggedBy = sanitizeHtml(newIssue.loggedBy);
    newIssue.location = sanitizeHtml(newIssue.location);
    newIssue.screen = sanitizeHtml(newIssue.screen);
    newIssue.category = sanitizeHtml(newIssue.category);
    newIssue.assigned = sanitizeHtml(newIssue.assigned);
    newIssue.description = sanitizeHtml(cleanHtml(newIssue.description));
    newIssue.browser = sanitizeHtml(newIssue.browser);
    newIssue.status = sanitizeHtml(newIssue.status);
    newIssue.dateAdded = sanitizeHtml(newIssue.dateAdded);
    newIssue.type = sanitizeHtml(newIssue.type);
    newIssue.area = sanitizeHtml(newIssue.area);
    newIssue.browser = sanitizeHtml(newIssue.browser);

    newIssue.save((err, saved) => {
        if (err) {
            console.log('issue save error', err);
            return res.status(500).send(err);
        }
        res.json({ issue: saved });
    });
}

function cleanHtml(html) {
    html = html.replace('<p>&nbsp;</p>', '').replace('<p><br></p>', '');
    return html;
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
 * Get all issues by project
 * @param req
 * @param res
 * @returns void
 */
export function getIssuesByUser(req, res) {
    Issue.find({ assigned: req.params.username }).sort({ id: 1 }).exec((err, issues) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ issues });
    });
}

/**
 * Save issue
 * @param req
 * @param res
 * @returns void
 */
export async function saveIssue(req, res) {
 
    const project = req.body.issue.project;
    const id = req.body.issue.id;
    const area = req.body.issue.area;
    const filter = 'all';
    const issueRoute = `http://localhost:8000/${project}/${area}/${filter}/${id}`;
    const issueToSave = req.body.issue;

    // If assignee has changed, send an email
    const existingIssue = await Issue.findOne({
        id: issueToSave.id,
        project: issueToSave.project
    });
    if (existingIssue.assigned !== issueToSave.assigned) {
        mail.send({
            username: issueToSave.assigned,
            filename: 'issue-assignment',
            subject: 'BIT issue assignment',
            issueRoute
        });
    }

    // Update Issue in Db
    Issue.findOneAndUpdate(
        { id: issueToSave.id, project: issueToSave.project },
        {
            $set: {
                assigned: issueToSave.assigned,
                status: issueToSave.status,
                location: issueToSave.location,
                screen: issueToSave.screen,
                category: issueToSave.category,
                area: issueToSave.area,
                browser: issueToSave.browser,
            },
        },
        { new: true }
    ).exec((err, issue) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ issue });
    });
}

/**
 * Batch issues
 * @param req
 * @param res
 * @returns void
*/
export async function batchIssues(req, res) {
    const issuesToSave = req.body.issues;
    const options = req.body.options;
    const projectCode = req.body.projectCode;
    const defaultOption = 'No change';
    // update issues
    if (!options.assigned || options.assigned == defaultOption) {
        for (let issue of issuesToSave) {
            await Issue.update(
                { id: issue.id },
                {
                    $set: {
                        status: options.pot,
                    },
                }
            );
        }
    } else if (!options.pot || options.pot == defaultOption) {
        for (let issue of issuesToSave) {
            await Issue.update(
                { id: issue.id },
                {
                    $set: {
                        assigned: options.assigned,
                    },
                }
            );
        }
    } else {
        for (let issue of issuesToSave) {
            await Issue.update(
                { id: issue.id },
                {
                    $set: {
                        assigned: options.assigned,
                        status: options.pot,
                    },
                }
            );
        }
    }

    // get updated issues
    Issue.find({ project: projectCode }).sort({ id: 1 }).exec((err, issues) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ issues });
    });
}

