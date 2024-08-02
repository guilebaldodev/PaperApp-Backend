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

export const aceptarInvitacion=async(req,res)=>{
    const {id}=req.params;
    console.log("a?")

    try {
        const invitacion=await Invitaciones.findByPk(id)
        if(!invitacion){
            return res.status(404).json({error:"Invitacion no encontrada"})
        }
        // console.log(invitacion)
        const CongresoId=invitacion.CongresoId
        const UsuarioId=invitacion.UsuarioId
        console.log(CongresoId,"???",UsuarioId)

        await invitacion.destroy();

        const membresia=await Membresias.findOne({
                where:{
                    CongresoId,
                    UsuarioId  
                }          
        })
        console.log(membresia,"?????")
        if(membresia) return  res.status(403).json({error:"El usuario ya pertenece al congreso"})

        await Membresias.create({
            CongresoId,
            UsuarioId
        })

        const nuevaMembresia=await  Membresias.findOne({
            where:{
                CongresoId,
                UsuarioId
            },
            include:{ 
                model:Usuarios,
                attributes:["RoleId","apellidos","nombre","url_contacto","autenticado","email","institucion"]
            }
    })
        


        return res.status(200).json(nuevaMembresia);


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
                attributes:["nombre","apellidos","RoleId","email"]
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

