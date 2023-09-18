'use strict';

module.exports = function (app) {
    var index = require('./controllers/hello');
    var items = require('./controllers/itemController');

    // index
    app.route('/')
        .get(index.index);

    app.route('/postRelawan')
        .post(items.postRelawan);

    app.route('/cekNIK')
        .post(items.cekNIK);

    // app.route('/findItems')
    //     .get(items.findItems);

    // app.route('/addItems')
    //     .post(items.addItems);

    // app.route('/itemDetails/:item_id/')
    //     .get(items.itemDetails);

    // app.route('/updateItem/:item_id/')
    //     .put(items.updateItem);

    // app.route('/deleteItem/:item_id/')
    //     .delete(items.deleteItem);


    // app.route('/testPy')
    //     .post(items.testPy)

};