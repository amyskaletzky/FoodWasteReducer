import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('food_reducer_users', {
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'food_reducer_users'
    }
)

// Users.hasMany(Meals) //add foreign key and as if wanted
// Users.belongsToMany(Meals, { through: FaveMeals })
export default Users;
