import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDB} from './config/db.js';
import apiRouter from './routes/index.js';
import { swaggerUi, swaggerSpec } from './swagger.js';

const app = express();
const message = 'User Account Management';

// call database connectivity function
connectToDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).send({ message }));
app.use('/api', apiRouter);

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// handling non existing routes
app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

/* THE MIDDLEWARE BELOW MUST BE LAST, SO NO NEW CODE SHOULD BE ADDED AFTER THIS LINE
*
* This overrides the default error handler to return a json response
*/
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  });
  
  export default app;

