import Congresos from "../model/congreso.model.js";
import Membresias from "../model/membresias.model.js";
import Usuarios from '../model/user.model.js'


export const obtenerMembresias=async(req,res)=>{
        
    const {id} =req.params;

    if(!(req.query.pageNumber)){
        console.log("entre")
        req.query.pageNumber=1
    }



    try {
        const congreso = await Congresos.findByPk(id);
        if (!congreso) return res.status(404).json({error:"Congreso no encontrado"})

        const {count,rows:membresias} = await Membresias.findAndCountAll({
            where: { CongresoId: id },
            include:Usuarios,
            limit:10,
            offset:(req.query.pageNumber-1)*10

          });
          const totalPages=Math.ceil(count/10)   
          if(!membresias) return res.status(404).json({erorr:"Membresias no encontradas no encontradas"})
        return res.status(200).json(
            {
                total:count,
                totalPages:totalPages,
                membresias:membresias
            }
        )

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