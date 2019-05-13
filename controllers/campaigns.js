const Campaign = require('../models/campaign.js');

module.exports = function(app) {


    // INDEX CAMPAIGN
    app.get('/campaigns', (req, res) => {
        Campaign.find()
            .then(campaign => {
                res.render('campaigns-index', { campaign: campaign });
            })
            .catch(err => {
                console.log(err);
            })
    })

    // NEW
    app.get('/campaigns/new', (req, res) => {
        res.render('campaigns-new', {});
    })

    // SHOW
    app.get('/campaigns/:id', (req, res) => {
        Campaign.findById(req.params.id).then((campaign) => {
            res.render('campaigns-show', { campaign: campaign })
        }).catch((err) => {
            console.log(err.message);
        })
    })


    // CREATE
    // app.post('/campaigns', (req, res) => {
    //     Campaign.create(req.body).then((campaign) => {
    //         console.log(campaign)
    //         res.redirect(`/campaigns/${campaign._id}`)
    //     }).catch((err) => {
    //         console.log(err.message)
    //     })
    // })
    // CREATE 
    app.post('/campaigns', (req, res) => {
        Campaign.create(req.body).then((campaign) => {
            // returning JSON
            res.status(200).send({ campaign: campaign})
        }).catch((err) => {
            res.status(400).send({ err: err })
        })
    })

    // EDIT
    app.get('/campaigns/:id/edit', (req, res) => {
        Campaign.findById(req.params.id, function (err, campaign) {
            res.render('campaigns-edit', { campaign: campaign });
        })
    })

    // UPDATE
    app.put('/campaigns/:id', (req, res) => {
        Campaign.findByIdAndUpdate(req.params.id, req.body)
            // console.log("edited")
            .then(campaign => {
                res.redirect(`/campaigns/${campaign._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })


    // DELETE
    app.delete('/campaigns/:id', function (req, res) {
        console.log("DELETE review")
        Campaign.findByIdAndRemove(req.params.id).then((campaign) => {
            res.redirect('/campaigns');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}