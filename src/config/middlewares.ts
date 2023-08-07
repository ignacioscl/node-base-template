import express, { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import BussinessError from '../types/exceptions/BussinessError';

export const signInCheckerMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const appName = req.header('App-name');
    const deviceId = req.header('Device-id');
    const token = req.header('Authorization');
    if (appName === 'TTK' && token && deviceId) {
        let tmp = (token.split(" ")[1])
        const decoded = jwt.decode(tmp, { json: true });
        if (decoded && decoded.data && decoded.data.id) {
            const idUser = decoded.data?.id;
            if (idUser) {
                (req as any).user = decoded.data;
                /*isValidSession(idUser, appName, deviceId, (session) => {
                    if (!session.isValid) {
                        const lastSignTime = session.lastSign.date.getTime();
                        res.send({
                            status: 'fail',
                            error: {
                                code: '-11',
                                message: `${session.lastSign.deviceModel},${lastSignTime}`,
                            },
                        });
                    } else {
                        next();
                    }
                });*/
                next();
            } else {
                next(new BussinessError("Error token",-102));
            }
        } else {
            console.log("error")
            next(new BussinessError("Error token",-101));
        }
    } else {
        next();
    }
};

export const versionCheckerMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const version = req.header('Version');
    const appName = req.header('App-name');
    if (version && appName) {
        /*isValidVersion(version, appName, (isValid) => {
            if (!isValid) {
                console.error('invalid version detected: ', version, appName);
                res.send({
                    status: 'fail',
                    error: {
                        code: '-10',
                    },
                });
            } else {
                next();
            }
        });*/
    } else {
        next();
    }
};

export const jsonResponseMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
    const originalJson = res.json.bind(res);
    (res as any).json = function (data) {
        let wrappedData : DataResponse = {} as DataResponse;
        if (data == null) {
          wrappedData = {
            data: null,
            status: (res as any).statusCode,
            errorResponse:null
          };
        } else if (data.errorResponse == null) {
            wrappedData = {
                data: data,
                status: (res as any).statusCode,
                errorResponse:null
              };
        } else {
            wrappedData = data;
        }
      
      return originalJson(wrappedData);
    };

  next();
}

export const protegerRutas = (req: any, res: any, next: NextFunction) => {

    signInCheckerMiddleware(req, res, next);
    const a = ((req.headers as any) as Express.Request & { authorization: string } )
    const token = (a.authorization ? a.authorization?.split(" ")[1] : '');
    if (!token) {
      const e1 = new BussinessError("No se proporcionó token",101);
      next(e1);
    }
}

export const jsonResponseErrorMiddleware = (err:  Error, req:any, res:any, next:any) => {

    const originalJson = res.json.bind(res);
     res.json = function (data:any) {
       const wrappedData = {
         data:null,
         status: (err as any).statusCode,
         errorResponse: {message: err.message, stack: ((err as any).statusCode < 100 ? '' : err.stack)}
       };
       return originalJson(wrappedData);
     };
     res.status(500).json(res.json);
 }