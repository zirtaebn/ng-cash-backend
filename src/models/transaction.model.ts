import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../database/postgresql';


export interface TransactionsInstance extends Model {

    id:number,
    debitedAccountId:number, 
    creditedAccountId:number,
    value:number,
    createdAt:Date

}

export const Transaction = sequelize.define<TransactionsInstance>('Account', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    debitedAccountId : {

        type: DataTypes.INTEGER
    },

    creditedAccountId: {

        type: DataTypes.INTEGER
    },

    value: {

        type: DataTypes.INTEGER
    },

    createdAt: {

        type: DataTypes.DATE
    }

}, {tableName:'transactions', timestamps:false});