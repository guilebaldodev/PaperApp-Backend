import Congresos from "../model/congreso.model";
import Membresias from "../model/membresias.model";



export const obtenerMembresias=async(req,res)=>{

    const {id} =req.params;

    try {
        
        const congreso = await Congresos.findByPk(id);
        if (!congreso) return res.status(404).json({error:"Congreso no encontrado"})
        const membresias=Membresias.findAll({where:{CongresoId:id}})
        if(membresias) return res.status(404).json({erorr:"Membresias no encontradas no encontradas"})
        return res.res(200).json(membresias)

    } catch (error){
        console.log(error)
        res.status(500).json({ error: 'Error interno del servidor' });       

    }
}

export const eliminarMembresia=async(req,res)=>{
    const {id}=req.params;
    try {
        const membresia= await Membresias.findByPk(id)
        if(!membresia) return res.status(404).json({error:"Membresia no encontrada"})
        await membresia.destroy()
        res.status(200).json({ mensaje: 'Membresia eliminiada correctamente' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error interno del servidor' });       
    }





}