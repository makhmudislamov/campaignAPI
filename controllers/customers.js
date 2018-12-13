module.exports = function (app) {

    app.get('/customers', (req, res) => {
        res.render('customers-index');
    })
}