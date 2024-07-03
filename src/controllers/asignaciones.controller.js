import Articulos from "../model/articulos.model.js"
import Asignaciones from "../model/asignaciones.model.js"
import Membresias from "../model/membresias.model.js"
import Usuarios from '../model/user.model.js'



export const adminEvaluacion=async(req,res)=>{
  const {id}=req.params;
  const {evaluacion}=req.body
  try {
    const articulo=await Articulos.findByPk(id)
    
    if (!articulo) res.status(404).json({ error: "Articulo no encontrado" });


    console.log(evaluacion)
    articulo.estado= (evaluacion==1)?"aprobado":"desaprobado"

    articulo.save()

    // console.log(articulo)

    return res.status(200).json(articulo)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error interno del servidor' });
  }





}

export const crearAsignacion=async(req,res)=>{
    const {id}=req.params
    const {idRevisor}=req.body
    const revisor=await Usuarios.findByPk(idRevisor)
    const articulo=await Articulos.findByPk(id)
    // console.log(revisor,articulo)
    
    if(!articulo) return res.status(404).json({error:"El articulo no existe"})
    if(!revisor) return res.status(404).json({error:"Asigna un revisor valido al articulo"})
    
    const asignacion=await Asignaciones.findOne({where:{UsuarioId:idRevisor,ArticuloId:id}})
    if(asignacion) return res.status(404).json({error:"El usuario ya esta asignado como revisor en el articulo"})

    try {
        const asignacion=Asignaciones.create({
            UsuarioId:idRevisor,
            ArticuloId:id
        })

        if(articulo.estado==="recibido"){
            console.log("entre")
            articulo.estado="asignado"
            articulo.save()
        }

        return res.json(201)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export const crearAsignaciones=async(req,res)=>{
  const { id:ArticuloId } = req.params;
  const {revisores}=req.body

  try {
    const revisoresIds=revisores.map(item=>item.UsuarioId) //Todos asignados
    const asignadosRequest=await Asignaciones.findAll({where:{ArticuloId}}) //ya asignados
    if(!asignadosRequest) res.status(200).json({ mensaje: 'Membresias no encontradas' });

    let asignados=[]
      asignadosRequest.forEach(element => {
        asignados.push(element.UsuarioId)
      });

    let newAsignados=[]
    revisoresIds.forEach(element=>{
      if(!(asignados.includes(element))){
        newAsignados.push(element)
      }
    })

    let borrados=[]
    asignados.forEach(element=>{
      if(!revisoresIds.includes(element)){
        borrados.push(element)
      }})

      if(newAsignados.length>0){
        const nuevasAsignaciones= newAsignados.map(UsuarioId=>({ArticuloId,UsuarioId}))
        console.log(ArticuloId,nuevasAsignaciones)
        const request=await Asignaciones.bulkCreate(nuevasAsignaciones)

        console.log(request,"nuevaaas")
      }

      if(borrados.length>0){
        await Asignaciones.destroy(
          {
            where:{
              ArticuloId,
              UsuarioId:borrados
            }
          }
        )

      }


      return res.status(200).json({ mensaje: 'Asignaciones actualizadas correctamente' });

  } catch(error) { 
    console.log(error)
    return res.status(500).json({ error: 'Error interno del servidor' });
  
  }

}


export const eliminarAsignacion=async(req,res)=>{
    const { id } = req.params;
    try {
        const asignacion = await Asignaciones.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({ error: 'Error en la eliminacdion' });
        }


        await asignacion.destroy();
        return res.status(200).json({ mensaje: 'Asignacion eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const obtenerAsignaciones=async(req,res)=>{
    const {articuloId:id,congresoId}=req.query
    console.log(id,congresoId,"??")
    
    try {
        const asignaciones=await Asignaciones.findAll({where:{ArticuloId:id}})
        const revisores=await Membresias.findAll({
          where:{CongresoId:congresoId},
          include:[
            {
              model:Usuarios,
              where:{RoleId:2}
            }
          ]
        })
        return res.status(200).json({
          asignaciones,
          revisores
        })
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });   
    }

}

export const veredictoAsignacion = async (req, res) => {
    const { id } = req.params; // ID de la asignación
    const { veredicto } = req.body; // Veredicto enviado por el revisor
  
    try {
      // Buscar la asignación por su ID
      const asignacion = await Asignaciones.findByPk(id);
      if (!asignacion) {
        return res.status(404).json({ error: 'Asignación no encontrada' });
      }

    // Obtener el artículo asociado a la asignación
    const articulo = await Articulos.findByPk(asignacion.ArticuloId);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo asociado no encontrado' });
    }
        
  
      // Actualizar el veredicto de la asignación
      asignacion.veredicto = veredicto;
      await asignacion.save();
  
      // Obtener todas las asignaciones para este artículo
      const asignacionesArticulo = await Asignaciones.findAll({
        where: { ArticuloId: asignacion.ArticuloId },
      });
  
      const veredictos = asignacionesArticulo.map(asign => asign.veredicto);
  
      // Contar la cantidad de aprobados y desaprobados
      const aprobados = veredictos.filter(v => v === 'aprobado').length;
      const desaprobados = veredictos.filter(v => v === 'desaprobado').length;
      const total=veredictos.length
      
      // Actualizar el estado del artículo según la mayoría de veredictos
      let estadoArticulo = ''; // Estado por defecto
      if (aprobados > desaprobados) {
        estadoArticulo = 'aprobado';
      } else if (desaprobados > aprobados) {
        estadoArticulo = 'desaprobado';
      } else {
        estadoArticulo = 'veredicto_parcial'; // En caso de empate
      }
  

      // Actualizar el estado del artículo
      articulo.estado = estadoArticulo;
      await articulo.save();
  
      return res.status(200).json({ mensaje: 'Veredicto registrado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

