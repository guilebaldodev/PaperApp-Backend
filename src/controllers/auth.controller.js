import bcryptjs from 'bcryptjs'
import Usuario from '../model/user.model.js';
import Rol from '../model/rol.model.js'
import { createToken } from '../../libs/jwt.js';

export const register=async (req, res) => {
    const { nombre, apellidos,contraseña, institucion,
        url_contacto,email, RoleId, } = req.body;
    try {
        const rolExistente = await Rol.findByPk(RoleId);
        console.log("Rol existente?",rolExistente)
        if (!rolExistente) {
            return res.status(404).json({ error: 'El rol especificado no existe' });
        }

        const usuarioExistente=await Usuario.findOne({where:{email}})
        if(usuarioExistente) return res.status(409).json({error:"El email ya esta en uso"})

        const passwordHash=await bcryptjs.hash(contraseña,10)
        const nuevoUsuario = await Usuario.create(
            { nombre,apellidos,contraseña:passwordHash, 
                email,url_contacto,institucion, RoleId });

            const token=await createToken({id:nuevoUsuario.id})
            res.cookie("token",token)
            console.log(nuevoUsuario)
            res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

export const  login=async(req,res)=>{
    const {email,contraseña}=req.body;
    console.log(email,contraseña)
    try {
        const userFound= await Usuario.findOne({where:{email}})
        if(!userFound) return res.status(404).json({error:"Usuario no encontrado"})
        const isMatch=await bcryptjs.compare(contraseña,userFound.contraseña)
        if(!isMatch) return res.status(404).json({error:"Credenciales incorrectas"})
        
        
        const token=await createToken({id:userFound.id})
        res.cookie("token",token)
        res.json({
            id:userFound.id,
            username:userFound.username,
            email:userFound.email
        })

         
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

}

