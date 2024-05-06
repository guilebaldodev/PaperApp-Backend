import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize

// Define el modelo manualmente
class Asignaciones extends Model {}

Asignaciones.init(
  {
    // Define los campos del modelo que coinciden con los de la tabla en la base de datos
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    veredicto:{
        type:DataTypes.ENUM(
            "aprobado",
            "desaprobado",
            "sin_revisar"
        ),
        allowNull:false,
        defaultValue:'sin_revisar'
    },
  },
  {
    sequelize,
    modelName: 'Asignaciones', // Nombre del modelo
  }
);

export default Asignaciones;