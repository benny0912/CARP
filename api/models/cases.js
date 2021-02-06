const mongoose = require('mongoose');

const caseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: { type: String, required: true, unique: true},
    casetitle: { type: String, required: true},
    summary: { type: String, required: true},
    keywords: { type: String},
    time: { type: String, default: "Unspecified"},
    place: { type: String},
    method: {type: String},
    live: {type: String},
    identity: {type: String},
    pillar: { type: String},
    domain: {type: String},
    outcome: {type: String}
}, 
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Case', caseSchema);