import { injectable } from 'inversify';
import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';

import ApartmentsModel from '../db/models/apartments.model';

import logger from '../utils/logger';
import HttpException from '../exceptions/HttpException';
import { Apartment } from '../types/apartments.type';

@injectable()
class ApartmentsService {
  public apartmentsModel = ApartmentsModel;

  public async createOne({
    title,
    description,
    price,
    imageStoragePath,
  }: {
    title: string;
    description: string;
    price: number;
    imageStoragePath: string;
  }): Promise<Apartment> {
    try {
      const apartment: ApartmentsModel = await this.apartmentsModel.create({
        title,
        description,
        price,
        imageStoragePath,
      });
      return apartment.toJSON() as Apartment;
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Apartments Service - createOne',
        message: err.stack,
      });
      throw new HttpException(500, 30006, err.message);
    }
  }

  public async update(query: UpdateOptions, data: Apartment) {
    try {
      await this.apartmentsModel.update(data, query);
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Apartments Service - update',
        message: err.stack,
      });
      throw new HttpException(500, 30001, err.message);
    }
  }

  public async deleteApartment(query: DestroyOptions): Promise<void> {
    try {
      await this.apartmentsModel.destroy(query);
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Apartments Service - deleteApartment',
        message: err.message,
      });
      throw new HttpException(500, 30006, err.params);
    }
  }

  public async findAndCountAll(query: FindOptions): Promise<any> {
    try {
      const result: any = await this.apartmentsModel.findAndCountAll(query);
      const resp = {
        ...result,
        rows: result.rows.map((row: any) => row.toJSON() as Apartment),
      };
      return resp;
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Apartments Service - findAllAndCount',
        message: err.message,
      });
      throw new HttpException(500, 30001, err.params);
    }
  }

  public async findAll(query: FindOptions): Promise<any> {
    try {
      const result: any = await this.apartmentsModel.findAll(query);
      const resp = result.map((row: any) => row.toJSON() as Apartment);
      return resp;
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Apartments Service - findAll',
        message: err.message,
      });
      throw new HttpException(500, 30001, err.params);
    }
  }

  public async findOne(query: FindOptions): Promise<Apartment> {
    try {
      const result: any = await this.apartmentsModel.findOne(query);

      return result;
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Apartments Service - findOne',
        message: err.message,
      });
      throw new HttpException(500, 30001, err.params);
    }
  }
}

export default ApartmentsService;
