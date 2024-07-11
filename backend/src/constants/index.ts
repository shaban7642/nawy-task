const SERVICE_IDENTIFIER = {
  SERVER_CONFIG: Symbol('ServerConfig'),
  APP_CONFIG: Symbol('AppConfig'),
  SEQUELIZE: Symbol('Sequelize'),
  APARTMENTS_SERVICE: Symbol('ApartmentsService'),
};

const UTIL = {
  ORDER_BY: {
    ASCENDING: 'ASC',
    DESCENDING: 'DESC',
  },
  FORMATS: {
    DATE: { YYYYMMDD: 'YYYY-MM-DD' },
  },
};

export { SERVICE_IDENTIFIER, UTIL };
