import sequelize from "../util/database.js";
import { Sequelize } from "sequelize";

const UnsolveQuestion = sequelize.define('unsolveQuestion', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: Sequelize.STRING
});

export default UnsolveQuestion;