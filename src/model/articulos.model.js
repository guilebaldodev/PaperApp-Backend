import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import Congresos from "./congreso.model.js";
import Autores from "./autor.mode.js";

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
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
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


export default Articulos;