const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Campaign = require('../models/campaign');

chai.use(chaiHttp);

const sampleCampaign = {
   
    "camp_title": "Smoking Kills",
    "camp_duration": "30 days", 
    "car_numb": "60 cars", 
    "camp_target": "SF population",
    "camp_message": "do not smoke"
}

describe('Campaigns', () => {

    after(() => {
        Campaign.deleteMany({ camp_title: 'Donation' }).exec((err, campaigns) => {
            console.log(campaigns)
            campaigns.remove();
        })
    });

    // TEST INDEX
    it('should index ALL campaigns on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW
    it('should display new form on /campaigns/new GET', (done) => {
        chai.request(server)
            .get(`/campaigns/new`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // TEST CREATE
    it('should create a SINGLE campaign on /campaigns POST', (done) => {
        chai.request(server)
            .post('/campaigns')
            .send(sampleCampaign)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // TEST SHOW
    it('should show a SINGLE review on /campaigns/<id> GET', (done) => {
        var campaign = new Campaign(sampleCampaign);
        campaign.save((err, data) => {
            chai.request(server)
                .get(`/campaigns/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST EDIT
    it('should edit a SINGLE campaign on /campaigns/<id>/edit GET', (done) => {
        var campaign = new Campaign(sampleCampaign);
        campaign.save((err, data) => {
            chai.request(server)
                .get(`/campaigns/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST UPDATE
    it('should update a SINGLE camp on /campaigns/<id> PUT', (done) => {
        var campaign = new Campaign(sampleCampaign);
        campaign.save((err, data) => {
            chai.request(server)
                .put(`/campaigns/${data._id}?_method=PUT`)
                .send({ 'camp_title': 'Updating the title' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST DELETE
    it('should delete a SINGLE campaign on /campaigns/<id> DELETE', (done) => {
        var campaign = new Campaign(sampleCampaign);
        campaign.save((err, data) => {
            chai.request(server)
                .delete(`/campaigns/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
});