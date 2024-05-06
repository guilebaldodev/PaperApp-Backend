import { testConnection } from "./app.js"
import app from "./app.js"
import Articulos from "./model/articulos.model.js"
import Congresos from "./model/congreso.model.js"
import Membresias from "./model/membresias.model.js"
import Roles from "./model/rol.model.js"
import Usuarios from "./model/user.model.js"
import bcryptjs from 'bcryptjs'

testConnection()


const insertions=async ()=>{
    const passwordHash=await bcryptjs.hash('123456',10)

    const datosUser=[
        {
            "nombre": "Admin",
            "apellidos": "Pérez",
            "contraseña": passwordHash,
            "institucion": "Universidad XYZ",
            "email": "user@gmail.com",
            "RoleId": "1"
          },
          {
            "nombre": "Revisor",
            "apellidos": "Pérez",
            "contraseña": passwordHash,
            "institucion": "Universidad XYZ",
            "email": "user2@gmail.com",
            "RoleId": "2"
          },
          {
            "nombre": "Ponente",
            "apellidos": "Pérez",
            "contraseña": passwordHash,
            "institucion": "Universidad XYZ",
            "email": "user3@gmail.com",
            "RoleId": "3"
          }
    ]

    const datosRoles=[
        {"nombre": "Admin"},
        {"nombre": "Revisor"},
        {"nombre": "Ponente"},
    ]

    const datosCongresos=[
        {"nombre": "Congreso de Tecnología","fecha": "2024-04-20","descripcion": "Congreso sobre avances tecnológicos","institucion": "Universidad XYZ"},
        {"nombre": "Congreso de Tecnología2","fecha": "2024-04-20","descripcion": "Congreso sobre avances tecnológicos","institucion": "Universidad XYZ"}
    ]

    const membresias=[
        {UsuarioId: 1,CongresoId:1, dueño: true},
        {UsuarioId: 1,CongresoId:2, dueño: true},
        {UsuarioId: 2,CongresoId:1},
        {UsuarioId: 2,CongresoId:2},
        {UsuarioId: 3,CongresoId:1},
        {UsuarioId: 3,CongresoId:2},

    ]
    
    const articulos=[
        {titulo:"titulo",link:"ajakja",cloudinary_url:"jsakjhkjas",palabras_clave:"jakja",abstract:"akj",CongresoId:1,UsuarioId:3},
        {titulo:"titulo",link:"ajakja",cloudinary_url:"jsakjhkjas",palabras_clave:"jakja",abstract:"akj",CongresoId:2,UsuarioId:3},
    ]
    try {
        await Roles.bulkCreate(datosRoles)
        await Usuarios.bulkCreate(datosUser)    
        await Congresos.bulkCreate(datosCongresos)
        await Membresias.bulkCreate(membresias)
        await Articulos.bulkCreate(articulos)
        
    } catch (error) {
        console.log(error)
    }
}


// insertions()

app.listen(3000,()=>console.log("Servidor on port 3000"))
