module.exports = function (app) {

    app.get('/drivers', (req, res) => {
        res.render('drivers-index');
    })
}