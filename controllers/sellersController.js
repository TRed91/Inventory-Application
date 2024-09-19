const db = require('../db/queries');

async function sellersGet(req, res) {
    const sellers = await db.getAllSellers();
    const msg = req.query.err;
    res.render('sellers', {sellers: sellers, message: msg});
}

async function addSellersPost(req, res) {
    try {
        const name = req.body.addSeller;
        await db.addSellerPost(name);
        console.log('Inserted into category: ', name);
        res.redirect('/sellers');
    } catch (err) {
        console.log(err.message);
        const errMsg = 'Company with the same name already exists.'
        res.redirect('/sellers/?err=' + errMsg);
    }
    
}

async function deleteSellersPost(req, res) {
    try {
        const name = req.body.deleteSeller;
        await db.deleteSeller(name);
        console.log('Deleted: ', name);
        res.redirect('/sellers');
    } catch (err) {
        console.log(err.message);
        const errMsg = 'Cannot delete seller company that has items assigned to it.'
        res.redirect('/sellers/?err=' + errMsg);
    }
    
}

async function editSellersPost(req, res) {
    try {
        const name = req.body.editSeller;
        const id = req.params.sellerId;
        await db.editSeller(id, name);
        console.log(`Changed seller name of id ${id} to ${name}`);
        res.redirect('/sellers');
    } catch (err) {
        console.log(err.message);
        const errMsg = 'Company with the same name already exists.'
        res.redirect('/sellers/?err=' + errMsg);
    }
    
}

module.exports = {
    sellersGet,
    addSellersPost,
    deleteSellersPost,
    editSellersPost
}