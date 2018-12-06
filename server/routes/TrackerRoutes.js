import Match from '../models/Match';

module.exports = {
    readMatches : function(req, res) {
        Match.find((err, matches) => {
            if(err) {
                console.log(err);
            }
            else {
                //console.log("ReadMatches: ");
                //console.log(matches);
                res.json(matches)
            }
        });
    },

    readMatch : function(req, res) {
        Match.findById(req.params.id, (err, match) => {
            if(err) {
                console.log(err);
            }
            else {
                //console.log("ReadMatch: ");
                //console.log(match);
                res.json(match);
            }
        });
    },

    updateMatch : function(req, res) {
        Match.findById(req.params.id, (err, match) => {
            if(!match) {
                return next(new Error('Could not find record.'));
            }
            else {
                match.date = req.body.date;
                match.matchType = req.body.matchType;
                match.deck = req.body.deck;
                match.oppDeck = req.body.oppDeck;
                match.outcome = req.body.outcome;
                match.notes = req.body.notes;

                match.save()
                    .then(match => {
                        //console.log("UpdateMatch: ");
                        //console.log(match);
                        res.json('Update done.');
                    })
                    .catch(err => {
                        res.status(400).send('Update failed.');
                    });
            }
        });
    },

    deleteMatch : function(req, res) {
        Match.findByIdAndRemove({_id: req.params.id}, (err, match) => {
            if(err) {
                res.json(err);
            }
            else {
                //console.log("DeleteMatch: ");
                //console.log(match);
                res.json('Delete successful.');
            }
        });
    },

    createMatch : function(req, res) {
        console.log(req.body);
        let newRecord = new Match(req.body);
        newRecord.save()
            .then(match => {
                //console.log("CreateMatch: ");
                //console.log(newRecord);
                res.status(200).json({'match': 'New record created.'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record.');
            });
    }
    //Game Tracker Routes End
}