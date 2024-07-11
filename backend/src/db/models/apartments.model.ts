import { Sequelize, Model, DataTypes } from 'sequelize';

class Apartments extends Model {
  public id!: number;

  public title?: string;

  public description?: string;

  public imageStoragePath?: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    Apartments.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        imageStoragePath: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.FLOAT,
        },
      },
      {
        sequelize,
        modelName: 'apartments',
        paranoid: true,
      }
    );
  }

  public static initAssociation(): void {}
}

export default Apartments;
