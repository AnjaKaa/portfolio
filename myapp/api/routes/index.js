'use strict'
const express = require('express');
const router = express.Router();

const ctrlBlog =  require ('../controllers/blog');
const ctrlWork =  require ('../controllers/works');
const ctrlSkills =  require ('../controllers/skills');

router.get('/blog', ctrlBlog.getArticles);
router.post('/blog', ctrlBlog.createArticle);
router.put('/blog/:id', ctrlBlog.editArticle);
router.delete('/blog/:id', ctrlBlog.deleteArticle);

router.get('/work', ctrlWork.getWorks);
router.post('/work', ctrlWork.createWork);

router.get('/skills',ctrlSkills.getSkills);
router.post('/skills',ctrlSkills.updateSkills);


module.exports = router;