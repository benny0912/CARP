const mongoose = require('mongoose');
const Case = require('../models/cases');

exports.case_get_all = (req, res, next) => {
    Case.find()
    .select('_id casetitle place time number')
    .exec()
    .then(results => {
        const response = {
            count: results.length,
            cases: results
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.case_get_by_case_id = (req, res, next) => {
    const id = req.body._id;
    Case.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "No valid entry found for provided case id: " + id
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.case_get_by_case_title = (req, res, next) => {
    const title = req.body.casetitle;
    if(!title) {
        return res.status(400).json({
            message: "Undefined title."
        });
    }
    Case.find({ casetitle : {$regex: title, $options:'i'} })
    .exec()
    .then(results => {
        const response = {
            count: results.length,
            cases: results
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.case_get_by_case_number = (req, res, next) => {
    const id = req.body.number
    Case.find({number: id})
    .exec()
    .then(result => {
        if(result.length >= 1) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "No valid entry found for provided case number: " + id
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.case_create_new_case = (req, res, next) => {
    Case.find({number: req.body.number})
    .exec()
    .then(foundCase => {
        if(foundCase.length >= 1) {
            return res.status(409).json({
                message: "Character Assasination (CA) Case " + req.body.number + " exists."
            });
        } else {
            const newCase = new Case({
                _id: new mongoose.Types.ObjectId(),
                number: req.body.number,
                casetitle: req.body.casetitle,
                summary: req.body.summary,
                keywords: req.body.keywords,
                time: req.body.time,
                place: req.body.place,
                method: req.body.method,
                live: req.body.live,
                identity: req.body.identity,
                pillar: req.body.pillar,
                domain: req.body.domain,
                outcome: req.body.outcome,
                created_at: Date.now(),
                updated_at: Date.now()
            });
            newCase.save()
            .then(result => {
                console.log(result);
                const response = {
                    message: "Created new character assasination case successfully.",
                    createdCase: {
                        _id: result._id,
                        number: result.number,
                        casetitle: result.casetitle,
                        summary: result.summary,
                        keywords: result.keywords,
                        time: result.time,
                        place: result.place,
                        method: result.method,
                        live: result.live,
                        identity: result.identity,
                        pillar: result.pillar,
                        domain: result.domain,
                        outcome: result.outcome,
                        created_at: result.created_at
                    }
                };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

        }
    })
}

exports.case_update_case = (req, res, next) => {
    const num = req.body.number;
    const updateOps = {};
    var casenum = null;
    for(const ops of req.body.fields) {
        updateOps[ops.propName] = ops.value;
        if(ops.propName === 'number')
            casenum = ops.value;
    }
    updateOps["updated_at"] = Date.now();
    if(casenum) {
        Case.find({number: casenum})
        .exec()
        .then(result => {
            if(result.length >= 1) {
                return res.status(400).json({
                    message: "Character Assasination (CA) Case " + casenum + " exists."
                });
            }
        });
    } 
    Case.update({number: num}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.case_delete_case = (req, res, next) => {
    const num = req.body.number;
    Case.remove({number: num})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}