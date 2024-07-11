import { Request } from 'express';

export interface RequestWithFile extends Request {
  file: any;
  title: string;
  description: string;
  price: number;
}
