import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Match = new Schema({
    date: {
        type: String,
        default: new Date().getMonth + '/' + new Date().getDay
    },
    matchType: {
        type: String
    },
    deck: {
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

export default mongoose.model('Match', Match, 'gamerecords');