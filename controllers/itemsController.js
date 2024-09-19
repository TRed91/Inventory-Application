const db = require('../db/queries');

async function itemsGet(req, res) {
    const orderBy = req.query.orderby || 'itemName';
    let items = []
    if (req.query.search) {
        items = await db.getSearchItems(req.query.search, orderBy);
    } else {
        items = await db.getAllItems(orderBy);
    }
    res.render('items', { items: items, filter: null });
}

async function getItemsByCategory(req, res) {
    const name = req.params.categoryName;
    const order = req.query.orderby || 'itemName';
    const items = await db.getItemsByCategory(name, order);
    res.render('items', {items: items, filter: {type: 'category', name: name}});
}

async function getItemsBySeller(req, res) {
    const name = req.params.sellerName;
    const order = req.query.orderby || 'itemName';
    const items = await db.getItemsBySeller(name, order);
    res.render('items', {items: items, filter: {type: 'seller', name: name}});
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
    getItemsBySeller,
    itemsFormGet,
    addItemPost,
    updateItemGet,
    updateItemPost,
    deleteItemPost
}