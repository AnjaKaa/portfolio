var express = require('express');
var router = express.Router();
var multer = require('multer');

var bodyParser = require('body-parser');

//var upload = multer({ dest: './upload/' });
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null,  __dirname + '/public/assets/images/works');
    },
    filename: function (request, file, callback) {
      callback(null, file.originalname)
    }
  });

var upload = multer({dest: './upload/', storage: storage});

const ctrlHome = require('../controllers/homepages');
const ctrlAbout = require('../controllers/about');
const ctrlBlog = require('../controllers/blog');
const ctrlWorks = require('../controllers/works');
const ctrlAdmin = require('../controllers/admin');


router.get('/', ctrlHome.getIndex);

router.post('/login', upload.single(),ctrlHome.autorization);


router.get('/my-works', ctrlWorks.getWorks);
router.post('/mail', upload.array(),ctrlWorks.sendEmail);

router.get('/blog', ctrlBlog.getBlog);

router.get('/about', ctrlAbout.getAbout);

var urlencodedParser = bodyParser.urlencoded({extended: false});
router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/blog',upload.array(),ctrlAdmin.addArticle);
router.post('/admin/skills', upload.array(),ctrlAdmin.updateSkills);
router.post('/admin/work',upload.array(),ctrlAdmin.addWork);



module.exports = router;
