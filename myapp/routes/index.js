var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({ dest: './upload/' });

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

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/blog',ctrlAdmin.addArticle);

router.post('/admin/skills',ctrlAdmin.updateSkills);



router.post('/admin/work', upload.single(),ctrlAdmin.addWork);



module.exports = router;
