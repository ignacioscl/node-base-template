import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';

import BussinessError from './types/exceptions/BussinessError';
import { jsonResponseErrorMiddleware, jsonResponseMiddleware, protegerRutas } from './config/middlewares';
import { AppDataSource } from './config/mysqlDatabase';
import facesRouter from './routes/FacesRoutes';

const app = express();
const port = 3000;



app.use(jsonResponseMiddleware)
app.use(protegerRutas);

app.use(bodyParser.json());

app.use("/api",facesRouter);
/*
app.post('/addFace', (req, res) => {
  //res.send('Hello World!' + dbHost);
  res.json({"name":(req as any).user});
});*/

app.use(jsonResponseErrorMiddleware);

app.listen(port, () => {
    AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })
  return console.log(`Express is listening at http://localhost:${port}`);
});