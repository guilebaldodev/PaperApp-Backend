import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import Congresos from "./congreso.model.js";
import Autores from "./autor.mode.js";
import Comentarios from "./comentarios.model.js";

class Articulos extends Model {}

Articulos.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    titulo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    link:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cloudinary_url:{
        type:DataTypes.STRING,
        allowNull:true
    },
    palabras_clave:{
        type:DataTypes.STRING,
        allowNull:false
    },

    abstract:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado: {
        type: DataTypes.ENUM(
          'aprobado',
          'desaprobado',
          'en_revision',
          'asignado',
          'recibido',
          'veredicto_parcial' // Estado para veredicto mitad y mitad
        ),
        allowNull: false,
        defaultValue: 'recibido', // Puedes establecer un valor predeterminado según tu lógica de negocios
      },
},

{
    sequelize,
    modelName: 'Articulos',
  }
)
Congresos.hasMany(Articulos)
Articulos.belongsTo(Congresos)


Articulos.hasMany(Autores)
Autores.belongsTo(Articulos)

Articulos.hasMany(Comentarios)
Comentarios.belongsTo(Articulos)



export default Articulos;