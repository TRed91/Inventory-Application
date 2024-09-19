const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');
const sellersController = require('../controllers/sellersController');
const indexRouter = Router();

indexRouter.get('/categories', categoriesController.categoriesGet);
indexRouter.post('/categories', categoriesController.addCategoriesPost);
indexRouter.post('/categories/delete', categoriesController.deleteCategoriesPost);
indexRouter.post('/:categoryId/edit', categoriesController.editCategoryPost);

indexRouter.get('/sellers', sellersController.sellersGet);
indexRouter.post('/sellers', sellersController.addSellersPost);
indexRouter.post('/sellers/delete', sellersController.deleteSellersPost);
indexRouter.post('/sellers/:sellerId/edit', sellersController.editSellersPost);

indexRouter.get('/items/category/:categoryName', itemsController.getItemsByCategory);
indexRouter.get('/items/seller/:sellerName', itemsController.getItemsBySeller);

indexRouter.get('/', itemsController.itemsGet);
indexRouter.get('/items', itemsController.itemsGet);
indexRouter.get('/add', itemsController.itemsFormGet);
indexRouter.post('/add', itemsController.addItemPost);
indexRouter.get('/:id/update', itemsController.updateItemGet);
indexRouter.post('/:id/update', itemsController.updateItemPost);
indexRouter.post('/:id/delete', itemsController.deleteItemPost);

module.exports = indexRouter;