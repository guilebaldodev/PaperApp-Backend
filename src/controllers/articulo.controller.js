import { deleteImage, uploadImage } from '../../utils/clodinary.js';
import Articulos from '../model/articulos.model.js'; // Importa el modelo de Articulos
import fs from 'fs-extra';
import Congresos from '../model/congreso.model.js';
import Membresias from '../model/membresias.model.js';

// Controlador para crear un nuevo artículo
async function crearArticulo(req, res) {
    const { titulo,palabras_clave, abstract} = req.body;
    const {congresoid:id}=req.params
    try {
        const congreso = await Congresos.findByPk(id);
        if(!congreso) return res.status(404).json({msg:"Congreso no encontrado"})
        const membresia=await Membresias.findOne({where:{UsuarioId:req.user.id,CongresoId:id}})
        if(!membresia) return res.status(404).json({msg:"No eres participante en el congreso"})
        if(!(req.files?.articulo)) return res.status(400).json({erorr:"Porfavor adjunta el arituclo el articulo"})

        const allowedExtensions = ['.pdf'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 megabytes en bytes

        const extension = req.files.articulo.name.split('.').pop();
        if (!allowedExtensions.includes(`.${extension}`)){
            await fs.unlink(req.files.articulo.tempFilePath)
            return res.status(404).json({error:"Solo se aceptan archivos en formato pdf"})
        }
            

        if (req.files.articulo.size > maxSizeInBytes){
                await fs.unlink(req.files.articulo.tempFilePath)
            return res.status(404).json({error:"Solo se aceptan archivos de menos de 5 megabytes"})
        }
        


        
        
        const result=await uploadImage(req.files.articulo.tempFilePath,"papers")
        const public_id=result.public_id
        const secure_url=result.secure_url
        await fs.unlink(req.files.articulo.tempFilePath)

        const nuevoArticulo = await Articulos.create({
            titulo,
            link:secure_url,
            cloudinary_url:public_id,
            palabras_clave,
            abstract,
            CongresoId:id,
            UsuarioId:req.user.id
        });


        res.status(201).json(nuevoArticulo); // Retorna el artículo creado
    } catch (error) {
        console.error('Error al crear el artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function obtenerArticulosPorUser(req, res) {
    try {
        console.log("hola")
        const articulos = await Articulos.findAll({where:{UsuarioId:req.user.id}});
        res.status(200).json(articulos); // Retorna todos los artículos
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function obtenerArticulosPorCongreso(req, res) {
    const {congresoid:id}=req.params
    try {
        console.log("hola?",id)
        const articulos = await Articulos.findAll({where:{CongresoId:id}});
        res.status(200).json(articulos); // Retorna todos los artículos
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


async function obtenerArticuloPorId(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        const articulo = await Articulos.findByPk(id);

        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        res.status(200).json(articulo); // Retorna el artículo encontrado
    } catch (error) {
        console.error('Error al obtener el artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function actualizarArticulo(req, res) {
    const { id } = req.params;
    const { titulo, palabras_clave, abstract } = req.body;

    try {
        const articulo = await Articulos.findByPk(id);
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        if(articulo.UsuarioId!=req.user.id) return res.status(404).json({error:"Solo los dueños de articulos pueden editarlos"})

        if((req.files?.articulo)){
            const allowedExtensions = ['.pdf'];
            const maxSizeInBytes = 5 * 1024 * 1024; // 5 megabytes en bytes
    
            const extension = req.files.articulo.name.split('.').pop();
            if (!allowedExtensions.includes(`.${extension}`)){
                await fs.unlink(req.files.articulo.tempFilePath)
                return res.status(404).json({error:"Solo se aceptan archivos en formato pdf"})
            }
                
    
            if (req.files.articulo.size > maxSizeInBytes){
                    await fs.unlink(req.files.articulo.tempFilePath)
                return res.status(404).json({error:"Solo se aceptan archivos de menos de 5 megabytes"})
            }
            



            console.log(req.files.articulo)
            const deleteImg=await deleteImage(articulo.cloudinary_url)
            console.log(deleteImg,"delete")
            const result=await uploadImage(req.files.articulo.tempFilePath,"papers")
            const public_id=result.public_id
            const link=result.secure_url
            await fs.unlink(req.files.articulo.tempFilePath)
            articulo.cloudinary_url=public_id
            articulo.link=link
        }

        articulo.titulo = titulo?titulo:articulo.titulo;
        articulo.palabras_clave = palabras_clave?palabras_clave:articulo.palabras_clave;
        articulo.abstract = abstract?abstract:articulo.abstract;
        await articulo.save();

        res.status(200).json(articulo); // Retorna el artículo actualizado
    } catch (error) {
        console.error('Error al actualizar el artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function eliminarArticulo(req, res) {
    const { id } = req.params;

    try {
        const articulo = await Articulos.findByPk(id);

        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        if(articulo.UsuarioId!=req.user.id) return res.status(404).json({error:"Solo los dueños de articulos pueden eliminarlos"})

        const deleteImg=await deleteImage(articulo.cloudinary_url)



        await articulo.destroy();

        res.status(200).json({ mensaje: 'Artículo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




export { obtenerArticulosPorCongreso,crearArticulo, obtenerArticulosPorUser, obtenerArticuloPorId, actualizarArticulo, eliminarArticulo };


