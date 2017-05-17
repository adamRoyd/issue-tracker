import User from '../models/user';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export function validateLogin(req, res, next){
    req.checkBody('email','That email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password','Password Cannot be Blank!').notEmpty();
    
    const errors = req.validatationErrors();
    if(error){
        //DO SOMETHING
    }

}