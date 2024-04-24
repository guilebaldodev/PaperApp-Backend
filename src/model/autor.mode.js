import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize

class Autores extends Model {}

Autores.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contacto: {
      type: DataTypes.STRING,
      allowNull:true
    },   
 
  },
  {
    sequelize,
    modelName: 'Autores',
  }
);



export default Autores;