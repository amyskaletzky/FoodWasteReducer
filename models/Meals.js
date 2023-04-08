import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

export const Meals = db.define('meals', {
    title: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    ingredients: {
        type: DataTypes.JSON
    },
    instructions: {
        type: DataTypes.JSON
    },
    nutritional_data: {
        type: DataTypes.JSON
    },
    dietary_restrictions: {
        type: DataTypes.JSON
    },
    num_of_servings: {
        type: DataTypes.INTEGER
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

// Meals.associate = (models) => {
//     Meals.belongsTo(models.Users,
//         { foreignKey: user_id })
// }

// Meals.associate = (models) => {
//     Meals.belongsToMany(models.Users,
//         { through: FaveMeals })
// }
