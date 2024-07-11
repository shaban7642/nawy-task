/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Response } from 'express';
import { RequestWithFile } from 'request.type';

async function uploadMiddleware(
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) {
  try {
    const { data } = req.query;
    console.log({ data });
    const parsedData = JSON.parse(data as string);
    req.title = parsedData.title;
    req.description = parsedData?.description;
    req.price = parsedData?.price;
    next();
  } catch (error) {
    next(error);
  }
}

export default uploadMiddleware;
