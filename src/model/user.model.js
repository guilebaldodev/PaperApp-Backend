import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; // Importa la instancia de Sequelize
import Rol from './rol.model.js'; // Importa el modelo 
import Congresos from './congreso.model.js';
import Membresias from './membresias.model.js';
import Articulos from './articulos.model.js';
import Comentarios from './comentarios.model.js';
import Asignaciones from './asignaciones.model.js';
import Logs from './logs.model.js';


class Usuarios extends Model {}

Usuarios.init(
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
    contraseña:{
      type:DataTypes.STRING,
      allowNull:false
    },
    institucion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    autenticado: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    url_contacto: {
      type: DataTypes.STRING,
      allowNull:true
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Usuarios',
  }
);

Usuarios.belongsTo(Rol); // Un usuario pertenece a un rol
Rol.hasMany(Usuarios); // Un rol tiene muchos usuarios

Usuarios.belongsToMany(Congresos,{through:Membresias})
Congresos.belongsToMany(Usuarios,{through:Membresias})

Usuarios.hasMany(Membresias)
Membresias.belongsTo(Usuarios)


Usuarios.hasMany(Comentarios)
Comentarios.belongsTo(Usuarios)

Usuarios.hasMany(Articulos)
Articulos.belongsTo(Usuarios)

Usuarios.belongsToMany(Articulos,{through:Asignaciones})
Articulos.belongsToMany(Usuarios,{through:Asignaciones})


Articulos.hasMany(Asignaciones)
Asignaciones.belongsTo(Articulos)

Usuarios.hasMany(Asignaciones)
Asignaciones.belongsTo(Usuarios)

Usuarios.hasMany(Logs)
Logs.belongsTo(Usuarios)




export default Usuarios;