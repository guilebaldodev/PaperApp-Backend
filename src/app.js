import express  from "express";
import morgan from 'morgan'
import { sequelize } from "./db.js";
import User from "./model/user.model.js"
import "dotenv/config"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import autorRouter from './routes/autores.routes.js'
import userRouter from './routes/user.routes.js'
import RolRouter from './routes/rol.routes.js'
import authRouter from './routes/auth.routes.js'
import congresoRouter from './routes/congreso.routes.js'
import ArticuloRouter from './routes/articulo.routes.js'
import ComentariosRouter from './routes/comentarios.routes.js'
import AsignacionRouter from './routes/asignacion.routes.js'
import cors from 'cors'

const app= express()
export async function testConnection(){
    
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
    
        await sequelize.sync(); //} Esto creará la tabla si no existe
    
    
      } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
}
}



app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"./uploads"
}))

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use("/api/v1",autorRouter)
app.use("/api/v1",ArticuloRouter)
app.use("/api/v1",authRouter)
app.use("/api/v1",RolRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",congresoRouter)
app.use("/api/v1",ComentariosRouter)
app.use("/api/v1",AsignacionRouter)

export default app;