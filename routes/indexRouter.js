const { Router } = require('express');
const indexController = require('../controllers/indexController');
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/categories', categoriesController.categoriesGet);
indexRouter.post('/categories', categoriesController.addCategoriesPost);
indexRouter.post('/categories/delete', categoriesController.deleteCategoriesPost);

indexRouter.get('/items', itemsController.itemsGet);
indexRouter.get('/add', itemsController.itemsFormGet);
indexRouter.post('/add', itemsController.addItemPost);

module.exports = indexRouter;