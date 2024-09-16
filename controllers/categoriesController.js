const db = require('../db/queries');

async function categoriesGet(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories', {categories: categories})
}

async function addCategoriesPost(req, res) {
    await db.addCategoryPost(req.body.addCategory);
    res.redirect('/categories');
}

async function deleteCategoriesPost(req, res) {
    await db.deleteCategory(req.body.deleteCategory);
    res.redirect('/categories');
}

module.exports = {
    categoriesGet,
    addCategoriesPost,
    deleteCategoriesPost
}