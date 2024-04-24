// import { DataTypes, Model } from 'sequelize';

import {Sequelize} from 'sequelize'

export const sequelize= new Sequelize("product_test","root","Mate4432",{
    host:"localhost",
    dialect:"mysql",
    port:"3306"
})

// class Rol extends Model {
//     // static associate(models){
//     //     this.hasMany(models.User)
//     // }
// }

// Rol.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//   },{
//     sequelize, // Usa la instancia de Sequelize importada
//     modelName: 'Rol',
//   }
// )

// class User extends Model{
//     // static associate(models){
//     //     this.belongsTo(models.Rol)
//     // }
// }

// User.init({
//     id:{
//         type:DataTypes.INTEGER,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     username:{
//         type:DataTypes.STRING,
//         allowNull:false,
//         unique:true
//     },
//     email:{
//         type:DataTypes.STRING,
//         allowNull:false,
//         unique:true,
//         validate:{
//             isEmail:true
//         }

//     }
//     },{
//         sequelize,
//         modelName:"User"
//     }

// )


// Rol.hasMany(User);
// User.belongsTo(Rol);
