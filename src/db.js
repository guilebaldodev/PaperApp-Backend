// import { DataTypes, Model } from 'sequelize';

import {Sequelize} from 'sequelize'

export const sequelize= new Sequelize("product_test","root","Mate4432",{
    host:"localhost",
    dialect:"mysql",
    port:"3306"
})

