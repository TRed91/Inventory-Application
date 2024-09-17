const db = require('../db/queries');

async function itemsGet(req, res) {
    const items = await db.getAllItems();
    res.render('items', { items: items });
}

async function getItemsByCategory(req, res) {
    const id = req.params.categoryId;
    const items = await db.getItemsByCategory(id);
    res.render('items', {items: items})
}

async function itemsFormGet(req, res) {
    const categories = await db.getAllCategories();
    const sellers = await db.getSellers();
    res.render('itemForm', {
        title: 'Add Item',
        action: '/add',
        categories: categories,
        sellers: sellers,
        item: {id:"", category:"", seller:"", name:"", price:"", quantity:""}
    });
}

async function addItemPost(req, res) {
    await db.addItem(req.body);
    res.redirect('/items');
}

async function updateItemGet(req, res) {
    const id = req.params.id;
    const categories = await db.getAllCategories();
    const sellers = await db.getSellers();
    const {category, seller, name, price, quantity} = req.query;
    res.render('itemForm', {
        title: 'Update Item',
        action: `/${id}/update`,
        categories: categories,
        sellers: sellers,
        item: { id, category, seller, name, price, quantity }
    });
}

async function updateItemPost(req, res) {
    const id = req.params.id;
    await db.updateItem(id, req.body);
    res.redirect('/items');
}

async function deleteItemPost(req, res) {
    const id = req.params.id;
    await db.deleteItem(id);
    console.log('Item deleted: ', id);
    res.redirect('/items');
}

module.exports = {
    itemsGet,
    getItemsByCategory,
    itemsFormGet,
    addItemPost,
    updateItemGet,
    updateItemPost,
    deleteItemPost
}