import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize

class Invitaciones extends Model {}

Invitaciones.init(
  {
    // Otros campos que puedas necesitar en esta tabla intermedia
   
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'Invitaciones',
    // Otras opciones si las necesitas
  }
);


export default Invitaciones;