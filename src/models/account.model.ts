import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../database/postgresql';


export interface AccountInstance extends Model {

    id:number,
    balance:number
}

export const Account = sequelize.define<AccountInstance>('Account', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    balance: {

        type: DataTypes.INTEGER,
        defaultValue: 100
    },

}, {tableName:'accounts', timestamps:false});