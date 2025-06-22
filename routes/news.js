const router = require('express').Router();
const newsController = require('../controller/news');

router.get('/category', newsController.newsByCategory);
router.get('/score', newsController.newsByScore);
router.get('/search', newsController.newsBySearch);
router.get('/source', newsController.newsBySource);
router.get('/nearby', newsController.newsByNearby);
router.get('/trending', newsController.trendingNews);
router.get('/generate-llm-summery-by-news-id', newsController.generateLlmSummeryByNewsId);

module.exports = router;