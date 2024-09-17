const { Router } = require('express');
const indexController = require('../controllers/indexController');
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/categories', categoriesController.categoriesGet);
indexRouter.post('/categories', categoriesController.addCategoriesPost);
indexRouter.post('/categories/delete', categoriesController.deleteCategoriesPost);

indexRouter.get('/:categoryId/items', itemsController.getItemsByCategory);

indexRouter.get('/items', itemsController.itemsGet);
indexRouter.get('/add', itemsController.itemsFormGet);
indexRouter.post('/add', itemsController.addItemPost);
indexRouter.get('/:id/update', itemsController.updateItemGet);
indexRouter.post('/:id/update', itemsController.updateItemPost);
indexRouter.post('/:id/delete', itemsController.deleteItemPost);

module.exports = indexRouter;