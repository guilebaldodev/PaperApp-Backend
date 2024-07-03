import Usuario from "../model/user.model.js";
import Rol from "../model/rol.model.js";
import Membresias from "../model/membresias.model.js";
import Comentarios from "../model/comentarios.model.js";
import Articulos from "../model/articulos.model.js";



export const getUser=async (req,res)=>{
    const {id}=req.params;



    try {
        const userFound= await Usuario.findCreateFind(id)
        if(!userFound) res.status(404).json({error:'El usuario no fue encontrado'})
        res.json(userFound)


    } catch (error) {
        res.status(500).json({error:"Error al obtener usuario"})
    }
}

export const getUserInfo=async (req,res)=>{
    const {id}=req.params
    console.log(req.user)
    console.log(id)
    try {
        const userFound=await Usuario.findByPk(id)
        const congresosCount=await Membresias.count({
            where:{
                UsuarioId:id
            }
        })
        console.log(userFound)
        const comentariosCount=await Comentarios.count({
            where:{
                UsuarioId:id
            }
        })
        const articulosCount=await Articulos.count({
            where:{
                UsuarioId:id
            }
        })
        
        if(!userFound) return res.status(404).json({error:"Usuario no enocontrado"})
            res.status(200).json({
            nombre:userFound.nombre,
            apellidos:userFound.apellidos,
            rol:userFound.RoleId,
            institucion:userFound.institucion,
            url_contacto:userFound.url_contacto,
            email:userFound.email,
            congresos:congresosCount,
            comentarios:comentariosCount,
            articulos:articulosCount,
        })
    } catch (error) {
        res.status(500).json({error:"Error al obtener usuario"})
    }
}



export const getUsers= async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: Rol });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}