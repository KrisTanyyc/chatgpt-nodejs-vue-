import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import sequelize from './util/database.js';
import UnsolveQuestion from './models/unsolveQuestion.js';
import apiRoute from './routes/api.js'
import Information from './models/information.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use(apiRoute);

Information.belongsTo(UnsolveQuestion, { constraints: true, onDelete: 'CASCADE' });
// Question.hasMany(Information);

sequelize.sync().then(result => {
    app.listen(8000);
})
.catch(err => console.log(err));


