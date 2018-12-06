import Card from '../models/Card';

module.exports = {
    readCollection : function(req, res) {
        Card.find((err, cards) => {
            if(err) {
                console.log(err);
            }
            else {
                //console.log("ReadCollection: ");
                //console.log(cards);
                res.json(cards);
            }
        })
    },

    updateCollection : function(req, res) {
        Card.findById(req.params.id, (err, card) => {
            if(!card) {
                return next(new Error('Could not find record.'));
            }
            else {
                card.owned = req.body.owned;
                card.save()
                    .then(card => {
                        //console.log("UpdateCollection: ");
                        //console.log(card);
                        res.json(card);
                    })
                    .catch(err => {
                        res.status(400).send('Update failed.');
                    })
            }
        });
    },

    //Should never use this method client side.
    createCardInCollection : function(req, res) {
        let newCard = new Card(req.body);
        newCard.save()
            .then(card => {
                //console.log("CreateCardInCollection: ");
                //console.log(newCard);
                res.json('Update done.');
            })
            .catch(err => {
                res.status(400).send('Update failed.');
            });
    },
    
    //Should never use this method client side.
    deleteCardInCollection : function(req, res) {
        Card.findByIdAndRemove({_id: req.params.id}, (err, card) => {
            if(err) {
                res.json(err);
            }
            else {
                //console.log("DeleteCardInCollection: ");
                //console.log(card);
                res.json('Delete successful.');
            }
        });    
    }
}