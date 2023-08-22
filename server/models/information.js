import sequelize from "../util/database.js";
import { Sequelize } from "sequelize";

const Information = sequelize.define('information', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: Sequelize.STRING
});

export default Information;