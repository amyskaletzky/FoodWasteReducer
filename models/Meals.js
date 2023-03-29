import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

export const Meals = db.define('meals', {
    title: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    ingredients: {
        type: DataTypes.STRING
    },
    instructions: {
        type: DataTypes.STRING
    },
    nutritional_data: {
        type: DataTypes.STRING
    },
    dietary_restrictions: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'meals'
    }
)

export const FaveMeals = db.define('favourite_meals', {
    user_id: {
        type: DataTypes.INTEGER
    },
    meal_id: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'meals'
    }
)

Users.belongsToMany(Meals, { through: 'favourite_meals' })