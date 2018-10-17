import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
    Comment.find({
        project: req.params.projectCode,
        issueId: req.params.id,
    }).sort('-dateAdded').exec((err, comments) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ comments });
    });
}
/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
    if (!req.body.comment.text) {
        res.status(403).end();
    }

    const newComment = new Comment(req.body.comment);

    // Let's sanitize inputs
    newComment.project = sanitizeHtml(newComment.project);
    newComment.issueId = sanitizeHtml(newComment.issueId);
    newComment.text = sanitizeHtml(newComment.text);
    newComment.user = sanitizeHtml(newComment.user);
    newComment.status = sanitizeHtml(newComment.status);
    newComment.time = sanitizeHtml(newComment.time);

    // newComment.slug = slug(newComment.text.toLowerCase(), { lowercase: true });
    // newComment.cuid = cuid();
    newComment.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ comment: saved });
    });
}
