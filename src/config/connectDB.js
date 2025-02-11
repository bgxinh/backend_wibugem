const { Sequelize } = require('sequelize');
require('dotenv').config();
// const sequelize = new Sequelize('databaseDuc', 'root', null, {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false
// });

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    connectDB
};
