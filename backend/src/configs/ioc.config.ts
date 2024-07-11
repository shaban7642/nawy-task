/* IoC Container */
import 'reflect-metadata';
import { Container } from 'inversify';
import { Sequelize } from 'sequelize';

import { SERVICE_IDENTIFIER } from '../constants';
import ServerConfig from './server.config';

import { sequelize } from '../db/models/index';
import { ApartmentsService } from '../services';

const container = new Container();

container
  .bind<ServerConfig>(SERVICE_IDENTIFIER.SERVER_CONFIG)
  .to(ServerConfig)
  .inSingletonScope();

container
  .bind<Sequelize>(SERVICE_IDENTIFIER.SEQUELIZE)
  .toDynamicValue(() => {
    return sequelize;
  })
  .inSingletonScope();

container
  .bind<ApartmentsService>(SERVICE_IDENTIFIER.APARTMENTS_SERVICE)
  .to(ApartmentsService);

export default container;
