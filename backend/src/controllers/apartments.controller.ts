/* eslint-disable no-continue */
/* eslint-disable consistent-return */
import { injectable } from 'inversify';
import { NextFunction, Response, Request } from 'express';
import { FindOptions } from 'sequelize';

import { SERVICE_IDENTIFIER } from '../constants';
import iocContainer from '../configs/ioc.config';

import { ApartmentsService } from '../services';
import { RequestWithFile } from '../types/request.type';
import { getPagination, getOrderOptions } from '../utils/sequelize';

@injectable()
class ApartmentsController {
  public ApartmentsService: ApartmentsService;

  constructor(
    ApartmentsService = iocContainer.get<ApartmentsService>(
      SERVICE_IDENTIFIER.APARTMENTS_SERVICE
    )
  ) {
    this.ApartmentsService = ApartmentsService;
  }

  public getAllApartments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { offset, limit, sortDir, sortBy } = req.query;

      const query: FindOptions = {
        ...getPagination(limit, offset),
        ...getOrderOptions([
          { sortKey: sortBy || 'createdAt', sortOrder: sortDir || 'asc' },
        ]),
      };

      const resp = await this.ApartmentsService.findAndCountAll(query);
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  };

  public getApartmentDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const query: FindOptions = {
        where: { id },
      };

      const resp = await this.ApartmentsService.findOne(query);
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  };

  public uploadApartment = async (
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { file, title, description, price } = req;

      const resp = await this.ApartmentsService.createOne({
        title,
        description,
        price,
        imageStoragePath: file.path,
      });
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  };

  public updateApartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const { id: ApartmentId } = req.params;
      const resp = await this.ApartmentsService.update(
        { where: { id: Number(ApartmentId) } },
        data
      );
      res.status(200).json({ success: true, resp });
    } catch (error) {
      next(error);
    }
  };

  public deleteApartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: ApartmentId } = req.params;
      const resp = await this.ApartmentsService.deleteApartment({
        where: { id: Number(ApartmentId) },
      });
      res.status(200).json({ success: true, resp });
    } catch (error) {
      next(error);
    }
  };
}

export default ApartmentsController;
