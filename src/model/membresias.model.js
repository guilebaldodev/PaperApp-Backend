import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize

class Membresias extends Model {}

Membresias.init(
  {
    // Otros campos que puedas necesitar en esta tabla intermedia
   
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dueño: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Membresias',
    // Otras opciones si las necesitas
  }
);


export default Membresias;