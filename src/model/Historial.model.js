import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize
import Articulos from './articulos.model.js'; // Importa el modelo de Articulos
import Usuarios from './usuarios.model.js'; // Importa el modelo de Usuarios

class Historial extends Model {}

Historial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    accion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Historial',
  }
);
