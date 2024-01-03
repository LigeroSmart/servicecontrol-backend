import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './route';
import swagger from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocs));

app.use(router);
