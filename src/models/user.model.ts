import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../database/postgresql';


export interface UserInstance extends Model {

    id:number,
    username:string,
    password:string,
    accountId:number
}

export const User = sequelize.define<UserInstance>('User', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {

        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },

    password: {

        type: DataTypes.TEXT,
        allowNull: false,
    },

    accountId: {

        type: DataTypes.INTEGER,
    }

}, {tableName:'users', timestamps:false});