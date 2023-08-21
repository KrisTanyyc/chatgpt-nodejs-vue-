import sequelize from "../util/database.js";
import { Sequelize } from "sequelize";

const Question = sequelize.define('question', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: Sequelize.STRING
});

export default Question;