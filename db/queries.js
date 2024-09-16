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
    const { rows } = await pool.query('SELECT itemName, price, quantity FROM item');
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
        VALUES ($1, $2, $3, $4, $5)`, [category, seller, name, price, quantity])
}

module.exports = {
    getAllCategories,
    addCategoryPost,
    deleteCategory,
    getAllItems,
    getSellers,
    addItem
}