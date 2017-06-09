import { Router } from 'express';
import * as IssueController from '../controllers/issue.controller';
import multer from 'multer';
const router = new Router();

//Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      let ext = "";
      switch (file.mimetype) {
          case 'image/jpeg':
              ext = '.jpeg';
              break;
          case 'image/png':
              ext = '.png';
              break;
      }
      cb(null, file.fieldname + '-' + Date.now() + ext);
  }
})
const upload = multer({storage: storage})


router.route('/(:projectCode)/issues/(:filter)').get(IssueController.getIssues);

router.route('/(:projectCode)/issues/(:filter)').post(IssueController.addIssue);

router.route('/(:projectCode)/issues/(:filter)').put(IssueController.batchIssues);

router.route('/(:projectCode)/issues/(:filter)/(:id)').put(IssueController.saveIssue);

router.post('/upload', upload.single('file'), function(req,res){
  console.log('REQUEST FILE');
	console.log(req.file); 
	res.json(req.file);
});

// router.get('/test', function (req, res) {
//     res.send('Birds home page')
// })

export default router;