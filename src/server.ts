import express from 'express';
import { AppDataSource } from './config/data-source';
import routes from './shared/routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

AppDataSource.initialize()
    .then(() => app.listen(process.env.PORT, () => console.log('Server up :)')))
    .catch(err => console.error(err));