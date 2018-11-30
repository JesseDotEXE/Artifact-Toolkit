import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let CardCollection = new Schema({
    cards: []
});

export default mongoose.model('CardCollection', CardCollection, 'collection');