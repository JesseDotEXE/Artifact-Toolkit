import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import GameRecord from './models/GameRecord';
import Card from './models/Card';
import fs from 'fs';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://jesse:password1@ds059702.mlab.com:59702/artifact-toolkit');
const connection = mongoose.connection;

connection.once('open', () => {
   console.log('MongoDB database connection established successfully!');
});

app.use('/', router);

//Collection Routes Start
router.route('/collection').get((req, res) => {
    Card.find((err, cards) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Inside /collection route.");
            console.log(cards);
            res.json(cards);
        }
    })
});

router.route('/collection/update/:id').post((req, res) => {
    console.log(req.body);
    Card.findById(req.params.id, (err, card) => {
       if(!card) {
           return next(new Error('Could not find record.'));
       }
       else {
           card.owned = req.body.owned;

           card.save()
               .then(card => {
                   console.log(card);
                   res.json(card);
               })
               .catch(err => {
                   res.status(400).send('Update failed.');
               })
       }
    });
});

//Should never use this method client side.
router.route('/collection/add/:id').post((req, res) => {
    console.log(req.body);
    let newCard = new Card(req.body);
    newCard.color = "blue";
    newCard.save()
        .then(card => {
            res.json('Update done.');
        })
        .catch(err => {
            res.status(400).send('Update failed.');
        });
});

//Should never use this method client side.
router.route('/collection/remove/:id').get((req, res) => {
    Card.findByIdAndRemove({_id: req.params.id}, (err, cards) => {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Delete successful.');
        }
    });
});

//Should never use client side.
router.route('/cards').get((req, res) => {
    let cards = getCardData();
    res.json(cards);
})

//Should never use client side.
function getCardData() {
    let rawData = fs.readFileSync('data/cards.json');
    let valveCardData = JSON.parse(rawData);
    let valveCards = valveCardData.card_set.card_list;

    //Dynamically modify the card data to just include relevant info for the client.
    let cleanCards = [];
    for(let vc of valveCards) {
        let type = "";
        type = vc.card_type;

        if(type === "Ability" || type === "Passive Ability") {
            //Skip if the card is a built in Ability.
        }
        else {
            let newCard = new Card();

            let color = "";
            if(vc.is_red) {
                color = "red";
            }
            else if(vc.is_blue) {
                color = "blue";
            }
            else if(vc.is_green) {
                color = "green";
            }
            else if(vc.is_black) {
                color = "black";
            }

            newCard.card_id = vc.card_id.toString();
            newCard.card_name = vc.card_name.english.toString();
            newCard.card_type = vc.card_type.toString();
            newCard.image = vc.large_image.default.toString();
            newCard.card_color = color.toString();
            newCard.owned = "false";

            newCard.save()
                .then(card => {
                    console.log('Update!')
                })
                .catch(err => {
                    console.log(err);
                });

            cleanCards.push(newCard);
        }
    }
    return cleanCards;
}
//Collection Routes End

//Game Tracker Routes Start
router.route('/tracker').get((req, res) => {
    GameRecord.find((err, gameRecords) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Inside /tracker route.");
            console.log(gameRecords);
            res.json(gameRecords)
        }
    });
});

router.route('/tracker/:id').get((req, res) => {
    GameRecord.findById(req.params.id, (err, gameRecord) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(gameRecord);
        }
    });
});

router.route('/tracker/update/:id').post((req, res) => {
    GameRecord.findById(req.params.id, (err, gameRecord) => {
        if(!gameRecord) {
            return next(new Error('Could not find record.'));
        }
        else {
            gameRecord.date = req.body.date;
            gameRecord.matchType = req.body.matchType;
            gameRecord.deck = req.body.deck;
            gameRecord.oppDeck = req.body.oppDeck;
            gameRecord.outcome = req.body.outcome;
            gameRecord.notes = req.body.notes;

            gameRecord.save()
                .then(gameRecord => {
                    res.json('Update done.');
                })
                .catch(err => {
                    res.status(400).send('Update failed.');
                });
        }
    });
});

router.route('/tracker/delete/:id').get((req, res) => {
    GameRecord.findByIdAndRemove({_id: req.params.id}, (err, gameRecord) => {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Delete successful.');
        }
    });
});

router.route('/tracker/create').post((req, res) => {
    console.log(req.body);
    let newRecord = new GameRecord(req.body);
    newRecord.save()
        .then(gameRecord => {
            res.status(200).json({'gameRecord': 'New record created.'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record.');
        });
});
//Game Tracker Routes End

app.listen(4000, () => console.log(`Express server running on port 4000`));