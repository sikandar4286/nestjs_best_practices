import { NextFunction, Request, Response } from 'express';

export function middleware1(req: Request, res: Response, next: NextFunction) {
  console.log('middleware1');
  next();
}
