import { Sequelize } from "sequelize";

const sequelize = new Sequelize('chatgpt', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;