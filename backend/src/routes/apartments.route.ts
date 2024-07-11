/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import moment from 'moment';
import { Router } from 'express';
import multer from 'multer';
import { Route } from '../types/routes.type';
import { ApartmentsController } from '../controllers';
import uploadMiddleware from '../middlewares/upload.middleware';

const multerStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const path = `public/uploads/apartments`;
    fs.mkdirSync(path, { recursive: true });

    cb(null, path);
  },
  filename: (req: any, file: any, cb: any) => {
    const ext = file.mimetype.split('/')[1];
    const filename = file.originalname.split('.')[0];
    cb(null, `${filename}-${moment().format('YYYYMMDD')}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

class ApartmentRoute implements Route {
  public path = '/api/apartments';

  public router = Router();

  public apartmentsController = new ApartmentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.apartmentsController.getAllApartments);

    this.router.get(
      `${this.path}/:id`,
      this.apartmentsController.getApartmentDetails
    );

    this.router.post(
      `${this.path}/upload`,
      uploadMiddleware,
      upload.single('file'),
      this.apartmentsController.uploadApartment
    );

    this.router.put(
      `${this.path}/:id`,

      this.apartmentsController.updateApartment
    );

    this.router.delete(
      `${this.path}/:id`,
      this.apartmentsController.deleteApartment
    );
  }
}

export default ApartmentRoute;
