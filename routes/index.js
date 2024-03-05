import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	// Return render index.html
	// res.render('index', { title: 'Express' });
	res.json({ title: 'Express' });
});

export default router;
