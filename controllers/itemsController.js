const db = require('../db/queries');

async function itemsGet(req, res) {
    const items = await db.getAllItems();
    res.render('items', { items: items });
}

async function itemsFormGet(req, res) {
    const categories = await db.getAllCategories();
    const sellers = await db.getSellers();
    res.render('itemForm', {
        title: 'Add Item',
        categories: categories,
        sellers: sellers
    });
}

async function addItemPost(req, res) {
    await db.addItem(req.body);
    res.redirect('/items');
}

module.exports = {
    itemsGet,
    itemsFormGet,
    addItemPost
}