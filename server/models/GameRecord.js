import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let GameRecord = new Schema({
    date: {
        type: String,
        default: new Date().getMonth + '/' + new Date().getDay
    },
    deck: {
        type: String
    },
    matchType: {
        type: String
    },
    oppDeck: {
        type: String
    },
    outcome: {
        type: String
    },
    notes: {
        type: String
    }
});

export default mongoose.model('GameRecord', GameRecord, 'gamerecords');