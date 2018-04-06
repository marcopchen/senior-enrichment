const Sequelize = require('sequelize');

const databaseURI = process.env.DATABASE_URL || 'postgres://localhost/senior_enrichment';

const conn = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

module.exports = conn;
