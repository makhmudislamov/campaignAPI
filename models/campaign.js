var mongoose = require('mongoose');

module.exports = mongoose.model('Campaign', {
    camp_title: String,
    camp_duration: String, // Int?
    car_numb: String, // how to chang to num?
    camp_target: String,
    camp_message: String
});
