import Articulos from "../model/articulos.model.js";
import Comentarios from "../model/comentarios.model.js";
import Congresos from "../model/congreso.model.js";
import Invitaciones from "../model/invitacion.model.js";
import Membresias from "../model/membresias.model.js";
import Usuarios from '../model/user.model.js'

export const crearInvitacion=async(req,res)=>{
    const {id}=req.params
    const userid=req.user.id

    try{ 

        const congreso=await Congresos.findByPk(id)
        if(!congreso) return res.status(403).json({error:"No se encontro el congreso"})

        const membresia= await Membresias.findOne({
            where:{
                UsuarioId:userid,
                CongresoId:id
            }
        })

        if(membresia) return res.status(403).json({error:"Ya perteneces a este congreso"})

            const invitacion=await Invitaciones.findOne({
            where:{
                UsuarioId:userid,
                CongresoId:id
            }
        })

        if(invitacion) return res.status(403).json({error:"Ya has solicitado unirte a este congreso"})


       await Invitaciones.create({
            UsuarioId:userid,
            CongresoId:id
        })


        return res.json(200)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const eliminarInvitacion=async(req,res)=>{
    const { id } = req.params;
    try {
        const invitacion = await Invitaciones.findByPk(id);
        if (!invitacion) {
            return res.status(404).json({ error: 'Invitacion no encontrada' });
        }
        await invitacion.destroy();
        return res.status(200).json({ mensaje: 'Invitacion eliminada correctamente' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const obtenerInvitaciones=async(req,res)=>{
    const {id}=req.params;
    try {
        const invitaciones=await Invitaciones.findAll({
            where:{
                CongresoId:id
            },
            include:{
                model:Usuarios,
                attributes:["nombre","apellidos","RoleId"]
            }
        })   


        return res.status(200).json(invitaciones);
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// export const obtenerComentarios=async(req,res)=>{
//     const {id}=req.params
//     try {
//         const comentarios=await Comentarios.findAll({where:{ArticuloId:id}})
//         return res.status(200).json(comentarios)
//     } catch (error) {
//         return res.status(500).json({ error: 'Error interno del servidor' });   
//     }
// }

