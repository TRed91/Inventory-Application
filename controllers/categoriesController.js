const db = require('../db/queries');

async function categoriesGet(req, res) {
    const categories = await db.getAllCategories();
    const msg = req.query.err;
    res.render('categories', {categories: categories, message: msg});
}

async function addCategoriesPost(req, res) {
    try {
        const name = req.body.addCategory;
        await db.addCategoryPost(name);
        console.log('Inserted into category: ', name);
        res.redirect('/categories');
    } catch (err) {
        console.log(err.message);
        const errMsg = 'Category with the same name already exists.'
        res.redirect('/sellers/?err=' + errMsg);
    }
    
}

async function deleteCategoriesPost(req, res) {
    try {
        const name = req.body.deleteCategory
        await db.deleteCategory(name);
        console.log('Deleted: ', name);
        res.redirect('/categories');
    } catch (err) {
        console.log(err.message);
        const errMsg = 'Cannot delete category that has items assigned to it.'
        res.redirect('/categories/?err=' + errMsg);
    }
    
}

async function editCategoryPost(req, res) {
    try {
        const name = req.body.editCategory;
        const id = req.params.categoryId;
        await db.editCategory(id, name);
        console.log(`Changed category name of id ${id} to ${name}`);
        res.redirect('/categories');
    } catch (err) {
        console.log(err.message);
        const errMsg = 'Category with the same name already exists.'
        res.redirect('/sellers/?err=' + errMsg);
    }
    
}

module.exports = {
    categoriesGet,
    addCategoriesPost,
    deleteCategoriesPost,
    editCategoryPost
}