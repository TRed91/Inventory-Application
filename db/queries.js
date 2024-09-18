const pool = require('./pool');

// Category queries =========================================================================
async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM category ORDER BY categoryName');
    return rows;
}

async function addCategoryPost(name) {
    await pool.query('INSERT INTO category (categoryName) VALUES ($1)', [name]);
}

async function deleteCategory(name) {
    await pool.query('DELETE FROM category WHERE categoryName = $1', [name]);
}

async function editCategory(id, name) {
    await pool.query('UPDATE category SET categoryName = $2 WHERE categoryId = $1', [id, name]);
}

// Item queries ==============================================================================
async function getAllItems() {
    const { rows } = await pool.query(`
        SELECT * FROM item i
        INNER JOIN category c ON i.categoryId = c.categoryId
        INNER JOIN seller s ON s.sellerId = i.sellerId
        ORDER BY itemName`);
    return rows;
}

async function getItemsByCategory(id) {
    const { rows } = await pool.query(`
        SELECT * FROM item i
        INNER JOIN category c ON i.categoryId = c.categoryId
        INNER JOIN seller s ON s.sellerId = i.sellerId
        WHERE i.categoryId = $1
        ORDER BY itemName;
        `, [id]);
    return rows;
}

async function getItemsBySeller(id) {
    const { rows } = await pool.query(`
        SELECT * FROM item i
        INNER JOIN category c ON i.categoryId = c.categoryId
        INNER JOIN seller s ON s.sellerId = i.sellerId
        WHERE i.sellerId = $1
        ORDER BY itemName;
        `, [id]);
    return rows;
}

async function getSellers() {
    const { rows } = await pool.query('SELECT * FROM seller');
    return rows;
}

async function addItem(item) {
    const { category, seller, name, price, quantity } = item;
    console.log(item)
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

// Seller queries ===========================================================================

async function getAllSellers() {
    const { rows } = await pool.query('SELECT * FROM seller ORDER BY sellerName');
    return rows;
}

async function addSellerPost(name) {
    await pool.query('INSERT INTO seller (sellerName) VALUES ($1)', [name]);
}

async function deleteSeller(name) {
    await pool.query('DELETE FROM seller WHERE sellerName = $1', [name]);
}

async function editSeller(id, name) {
    await pool.query('UPDATE seller SET sellerName = $2 WHERE sellerId = $1', [id, name]);
}

module.exports = {
    getAllCategories,
    addCategoryPost,
    editCategory,
    deleteCategory,
    getAllItems,
    getItemsByCategory,
    getItemsBySeller,
    getSellers,
    addItem,
    updateItem,
    deleteItem,
    getAllSellers,
    addSellerPost,
    deleteSeller,
    editSeller
}