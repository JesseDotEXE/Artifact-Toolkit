import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import CardRoutes from './routes/CardRoutes';
import TrackerRoutes from './routes/TrackerRoutes';
import CollectionRoutes from './routes/CollectionRoutes';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://jesse:password1@ds059702.mlab.com:59702/artifact-toolkit');
const connection = mongoose.connection;

connection.once('open', () => {
   console.log('MongoDB database connection established successfully!');
});

//General Routes
app.use('/', router);

//Card Routes
router.route('/cards').get(CardRoutes.readCards);

//Match Tracker Routes
router.route('/tracker').get(TrackerRoutes.readMatches);
router.route('/tracker/:id').get(TrackerRoutes.readMatch);
router.route('/tracker/update/:id').post(TrackerRoutes.updateMatch);
router.route('/tracker/delete/:id').get(TrackerRoutes.deleteMatch);
router.route('/tracker/create').post(TrackerRoutes.createMatch);

router.route('/collection/').get(CollectionRoutes.readCollection);
router.route('/collection/update/:id').post(CollectionRoutes.updateCollection);


app.listen(4000, () => console.log(`Express server running on port 4000`));