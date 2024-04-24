import Usuario from "../model/user.model.js";
import Rol from "../model/rol.model.js";



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


export const getUsers= async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: Rol });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}