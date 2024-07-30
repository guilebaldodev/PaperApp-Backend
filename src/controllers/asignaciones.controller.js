import Articulos from "../model/articulos.model.js"
import Asignaciones from "../model/asignaciones.model.js"
import Logs from "../model/logs.model.js"
import Membresias from "../model/membresias.model.js"
import Usuarios from '../model/user.model.js'



export const adminEvaluacion=async(req,res)=>{
  const {id}=req.params;
  const {veredicto}=req.body
  try {
    if(!["desaprobado","aprobado"].includes(veredicto)) return res.status(404).json({ error: 'Ingresa una veredicto adecuado' });

    const articulo=await Articulos.findByPk(id)
    
    if (!articulo)return  res.status(404).json({ error: "Articulo no encontrado" });


  console.log(veredicto)    
    articulo.estado=veredicto

    await articulo.save()
    await Logs.create({
      UsuarioId:req.user.id,
      ArticuloId:id,
      tipo:"admin",
      veredicto
  })
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
    const states=['aprobado','desaprobado','en revision']
    const article=await Articulos.findByPk(ArticuloId)
    
    if(states.includes(article.estado))return res.status(403).json({ mensaje: 'No se puede asignar un articulo que esta en revision o ya fue revisado' });

    if(!article) res.status(404).json({ mensaje: 'Articulos no encontrados' });
    const revisoresIds=revisores.map(item=>item.UsuarioId) //Todos asignados
    const asignadosRequest=await Asignaciones.findAll({where:{ArticuloId}}) //ya asignados
    if(!asignadosRequest)return res.status(404).json({ mensaje: 'Membresias no encontradas' });

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
        const nuevasAsignaciones= newAsignados.map(UsuarioId=>({ArticuloId,UsuarioId,tipo:"asignacion"}))
        const request=await Asignaciones.bulkCreate(nuevasAsignaciones)

        await Logs.bulkCreate(nuevasAsignaciones)

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
        await Logs.destroy(
          {
            where:{
              ArticuloId,
              UsuarioId:borrados
            }
          }
        )



      }
      const updatedAssignments=await Asignaciones.findAll({where:{ArticuloId}})
      let state=''
      if (updatedAssignments.length>0){
        state="asignado"
      }else{
        state="recibido"
      }
      console.log("-----------")
      if(state!==article.estado){
        article.estado=state
        article.save()
      }
      return res.status(200).json(article);
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
    const { id } = req.params; 
    const { veredicto } = req.body; 
    const   userid=req.user.id

    try {
      console.log(veredicto)
      if(!["desaprobado","aprobado"].includes(veredicto)) return res.status(404).json({ error: 'Ingresa un veredicto adecuado' });

      // const asignacion = await Asignaciones.findByPk(id);
      // if (!asignacion) {
      //   return res.status(404).json({ error: 'Asignación no encontrada' });
      // }

      const articulo = await Articulos.findByPk(id);
      if (!articulo) {
        return res.status(404).json({ error: 'Artículo asociado no encontrado' });
      }
          
      
      const asignacionesArticulo = await Asignaciones.findAll({
        where: { ArticuloId: id },
      });
    
      const miAsinacion=asignacionesArticulo.find(asign=>asign.UsuarioId==userid)
      miAsinacion.veredicto = veredicto;
      await miAsinacion.save();
      await Logs.create({
        UsuarioId:userid,
        ArticuloId:id,
        tipo:"revision",
        veredicto
    })

      const veredictos = asignacionesArticulo.map(asign => asign.veredicto);

      

      const aprobados = veredictos.filter(v => v === 'aprobado').length;
      const desaprobados = veredictos.filter(v => v === 'desaprobado').length;
      const total=veredictos.length

  
      
      let estadoArticulo; 


      if (aprobados + desaprobados === total) {
        if (aprobados === total) {
            console.log("------- aprobado");
            estadoArticulo = "aprobado";
            await Logs.create({
              UsuarioId:userid,
              ArticuloId:id,
              tipo:"evaluacion",
              veredicto:"aprobado"
          })
  
        } else if (desaprobados === total) {
            console.log("------- desaprobado");
            estadoArticulo = "desaprobado";
            await Logs.create({
              UsuarioId:userid,
              ArticuloId:id,
              tipo:"evaluacion",
              veredicto:"desaprobado"
          })
          } else {
            console.log("------ en revision");
            estadoArticulo = "en revision";
        }
    } else {
        console.log("------- en revision");
        estadoArticulo = "en revision";
    }

          console.log("--------",estadoArticulo)
          articulo.estado = estadoArticulo;
          await articulo.save();
  
      return res.status(200).json({
        articuloEstado:articulo.estado,
        estado:miAsinacion.veredicto
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

