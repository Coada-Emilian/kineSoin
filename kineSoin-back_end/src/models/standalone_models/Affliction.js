import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';


export class Affliction extends Model {}

Affliction.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    insurance_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    
})