import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import Comentarios from "./comentarios.model.js";

class Congresos extends Model {}

Congresos.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    institucion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    web_institucion:{
        type:DataTypes.STRING,
        allowNull:true
    },
    link_convocatoria:{
        type:DataTypes.STRING,
        allowNull:true
    },
    archivado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
},

{
    sequelize,
    modelName: 'Congresos',
  }
)





export default Congresos;