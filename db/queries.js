const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM category');
    return rows;
}

async function addCategoryPost(name) {
    await pool.query('INSERT INTO category (categoryName) VALUES ($1)', [name]);
    console.log('Inserted into category: ', name);
}

async function deleteCategory(name) {
    await pool.query('DELETE FROM category WHERE categoryName = $1', [name]);
    console.log('Deleted: ', name);
}

async function getAllItems() {
    const { rows } = await pool.query('SELECT * FROM item');
    return rows;
}

async function getItemsByCategory(id) {
    const { rows } = await pool.query('SELECT * FROM item WHERE categoryId = $1', [id]);
    return rows;
}

async function getSellers() {
    const { rows } = await pool.query('SELECT * FROM seller');
    return rows;
}

async function addItem(item) {
    const { category, seller, name, price, quantity } = item;
    await pool.query(`
        INSERT INTO item (categoryId, sellerId, itemName, price, quantity)
        VALUES ($1, $2, $3, $4, $5)`, [category, seller, name, price, quantity]);
}

async function updateItem(id, values) {
    const { category, seller, name, price, quantity } = values;
    await pool.query(`
        UPDATE item SET 
            categoryId = $1,
            sellerId = $2,
            itemName = $3,
            price = $4,
            quantity = $5
        WHERE itemId = $6`, [category, seller, name, price, quantity, id]);
}

async function deleteItem(id) {
    await pool.query('DELETE FROM item WHERE itemId = $1', [id]);
}

module.exports = {
    getAllCategories,
    addCategoryPost,
    deleteCategory,
    getAllItems,
    getItemsByCategory,
    getSellers,
    addItem,
    updateItem,
    deleteItem
}