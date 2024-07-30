import Articulos from "../model/articulos.model.js";
import Comentarios from "../model/comentarios.model.js";
import Usuarios from '../model/user.model.js'

export const crearComentario=async(req,res)=>{
    const {id}=req.params
    const {comentario}=req.body
    if((!comentario)|| comentario==='') return res.status(404).json({error:"El comentario es requerido"})

    try {
        const articulo=await Articulos.findByPk(id)
        if(!articulo) return res.status(404).json({error:"Articulo no encontrado"})
        const nuevoComentario= await Comentarios.create({
            comentario,
            UsuarioId:req.user.id,
            ArticuloId:id
        })
 
        const comentarioNuevo=await Comentarios.findByPk(nuevoComentario.id,{
            include:{
                model:Usuarios,
                attributes:['nombre','apellidos']
                
            }
        })

        return res.status(201).json(comentarioNuevo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const eliminarComnetario=async(req,res)=>{
    const { id } = req.params;
    try {
        const comentario = await Comentarios.findByPk(id);
        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        if(comentario.UsuarioId!=req.user.id) return res.status(404).json({ error: 'Solo el autor puede eliminar el comentario' });

        await comentario.destroy();
        return res.status(200).json({ mensaje: 'Comentario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const obtenerComentarios=async(req,res)=>{
    const {id}=req.params
    try {
        const comentarios=await Comentarios.findAll({where:{ArticuloId:id}})
        return res.status(200).json(comentarios)
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });   
    }
}

