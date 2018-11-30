import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import GameRecord from './models/GameRecord';
import CardCollection from './models/CardCollection';
import fs from 'fs';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const databaseURL = 'mongodb://jesse:password1@ds059702.mlab.com:59702/artifact-toolkit';
mongoose.connect('mongodb://jesse:password1@ds059702.mlab.com:59702/artifact-toolkit');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use('/', router);

//Card List Routes Start
router.route('/cards').get((req, res) => {
    res.json(getCardData());
})

function getCardData() {
    let rawData = fs.readFileSync('data/cards.json');  
    let cards = JSON.parse(rawData);  
    console.log(cards);
    return cards;  
}
//Card List Route End

//Collection Routes Start
router.route('/collection').get((req, res) => {

});

router.route('/collection/:id').get((req, res) => {
    CardCollection.findById(req.params.id, (err, collection) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Inside /collection/:id route.");
            res.json(collection);
        }
    });
    res.send("In the Collection!");
});

router.route('/collection/add/:id/:card').get((req, res) => {
    CardCollection.findById(req.params.id, (err, collection) => {
        if(!collection) {
            return next(new Error('Could not find record.'));
        }
        else {
            console.log(collection);
            collection.cards.push(req.params.card);
            console.log(collection);

            collection.save()
                .then(collection => {
                    res.json('Update done.');
                })
                .catch(err => {
                    res.status(400).send('Update failed.');
                });
        }
    });
});

router.route('/collection/remove/:id/:card').get((req, res) => {
    CardCollection.findById(req.params.id, (err, collection) => {
        if(!collection) {
            return next(new Error('Could not find record.'));
        }
        else {
            console.log(collection);
            const cardIndex = collection.cards.indexOf(req.params.card);
            if(cardIndex !== -1) {
                collection.cards.splice(cardIndex, 1);
            }
            console.log(collection);

            collection.save()
                .then(collection => {
                    res.json('Update done.');
                })
                .catch(err => {
                    res.status(400).send('Update failed.');
                });
        }
    });
});
//Collection Routes End

//Game Tracker Routes Start
router.route('/tracker').get((req, res) => {
    GameRecord.find((err, gameRecords) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Inside /tracker route.");
            console.log(gameRecords.length);
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