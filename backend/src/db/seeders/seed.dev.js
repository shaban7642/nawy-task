const sourcePath = './dev';

module.exports = {
  up: (queryInterface) => {
    const now = new Date();
    const timestamps = {
      createdAt: now,
      updatedAt: now,
    };

    return queryInterface.sequelize.transaction(async (transaction) => {});
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {});
  },
};
