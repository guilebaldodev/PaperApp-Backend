import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize

// Define el modelo manualmente
class Logs extends Model {}

Logs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    veredicto:{
        type:DataTypes.ENUM(
            "aprobado",
            "desaprobado",
        ),
        allowNull:true,
    },
    tipo:{
        type:DataTypes.ENUM(
            "edicion",
            "revision",
            "evaluacion",
            "asignacion",
            "admin"
        ),
        allowNull:false,
    },
  },
  {
    sequelize,
    modelName: 'Logs', // Nombre del modelo
  }
);

export default Logs;