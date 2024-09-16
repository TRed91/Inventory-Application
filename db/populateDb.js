const { Client } = require('pg');

const SQL_CategorySeed = `
CREATE TABLE IF NOT EXISTS category (
    categoryId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName VARCHAR(50) NOT NULL
)
`;

const SQL_SellerSeed = `
CREATE TABLE IF NOT EXISTS seller (
    sellerId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    sellerName VARCHAR(50) NOT NULL
)
`;

const SQL_ItemSeed = `
CREATE TABLE IF NOT EXISTS Item (
    itemId BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryId INTEGER,
    sellerId INTEGER,
    itemName VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY (categoryId)
        REFERENCES category(categoryId),
    CONSTRAINT fk_seller
        FOREIGN KEY (sellerId)
        REFERENCES seller(sellerId)
)
`;

async function main() {
    const client = new Client({
        connectionString: process.argv[2],
    });
    console.log('Start seeding...')
    await client.connect();
    await client.query(SQL_CategorySeed);
    await client.query(SQL_SellerSeed);
    await client.query(SQL_ItemSeed);
    await client.end();
    console.log('Seeding done!');
}

main();