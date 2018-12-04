import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Card = new Schema({
    card_id: {
        type: String
    },
    card_name: {
        type: String
    },
    card_type: {
        type: String
    },
    image: {
        type: String
    },
    card_color: {
        type: String
    },
    owned: {
        type: String
    }
});

export default mongoose.model('Card', Card, 'collection');