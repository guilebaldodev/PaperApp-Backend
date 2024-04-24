import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize

class Comentarios extends Model {}

Comentarios.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    comentario: {
      type: DataTypes.STRING,
      allowNull:false
    },   
 
  },
  {
    sequelize,
    modelName: 'Comentarios',
  }
);



export default Comentarios;