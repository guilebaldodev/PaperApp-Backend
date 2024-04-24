import Congresos from "../model/congreso.model.js";
import Membresias from "../model/membresias.model.js";
// Controlador para obtener todos los congresos
// Controlador para obtener congresos según el usuario


async function obtenerCongresos(req, res) {
    const { id } = req.user; // Suponiendo que el ID del usuario se envía en la solicitud

    console.log(id,"usuarioo")

    try {
        // Obtiene las membresias del usuario
        const membresias = await Membresias.findAll({ where: { UsuarioId:id } });

        // Obtiene los IDs de los congresos asociados al usuario
        const idsCongresos = membresias.map(m => m.CongresoId);
        console.log(idsCongresos,"mis membresias")

        // Obtiene los congresos asociados al usuario
        const congresos = await Congresos.findAll({ where: { id: idsCongresos } });

        res.status(200).json(congresos);
    } catch (error) {
        console.error('Error al obtener los congresos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Exporta el controlador para ser utilizado en las rutas

// Controlador para crear un nuevo congreso
async function crearCongreso(req, res) {
    const { id } = req.user; // Suponiendo que el ID del usuario se envía en la solicitud

    console.log('id',id)
    const { nombre, fecha, descripcion, institucion, web_institucion, link_convocatoria } = req.body;

    try {
        const nuevoCongreso = await Congresos.create({
            nombre,
            fecha,
            descripcion,
            institucion,
            web_institucion,
            link_convocatoria
        });

        const membresia=await Membresias.create({
            UsuarioId: id,
            CongresoId: nuevoCongreso.id, // Utiliza el ID del congreso recién creado
            dueño: true, // Suponiendo que la membresía es aceptada automáticamente al crear el congreso
        });

        console.log(membresia,membresia)

        res.status(201).json(nuevoCongreso);
    } catch (error) {
        console.error('Error al crear el congreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Controlador para obtener un congreso por ID
async function obtenerCongresoPorId(req, res) {
    const { id } = req.params;

    try {
        const congreso = await Congresos.findByPk(id);

        if (!congreso) {
            return res.status(404).json({ error: 'Congreso no encontrado' });
        }

        res.status(200).json(congreso);
    } catch (error) {
        console.error('Error al obtener el congreso por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Controlador para editar un congreso por ID
async function editarCongreso(req, res) {
    const { id } = req.params;
    console.log("id",id)
    const { nombre, fecha, descripcion, institucion, web_institucion, link_convocatoria, archivado } = req.body;

    try {
        const congreso = await Congresos.findByPk(id);

        if (!congreso) {
            return res.status(404).json({ error: 'Congreso no encontrado' });
        }
        const membresia=await Membresias.findOne({where:{UsuarioId:req.user.id,CongresoId:id}})
        
        if(!membresia) return res.status(404).json({error:"No eres participante en el congreso"})

        if(!membresia.dueño) return res.status(403).json({error:"Solo los dueños de los congresos pueden editar sus congresos"})


        // Actualiza los datos del congreso
        congreso.nombre = nombre?nombre:congreso.nombre
        congreso.fecha = fecha?fecha:congreso.fecha;
        congreso.descripcion = descripcion?descripcion:congreso.descripcion;
        congreso.institucion = institucion?institucion:congreso.institucion;
        congreso.web_institucion = web_institucion?web_institucion:congreso.web_institucion;
        congreso.link_convocatoria = link_convocatoria?link_convocatoria:congreso.link_convocatoria;
        congreso.archivado = archivado?archivado:congreso.archivado;

        // Guarda los cambios en la base de datos
        await congreso.save();

        res.status(200).json(congreso);
    } catch (error) {
        console.error('Error al editar el congreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function invitacionCongreso(req,res){
    const {id}=req.params

    try {
        const congreso = await Congresos.findByPk(id);
        if (!congreso) return res.status(404).json({error:"Congreso no encontrado"})
        
        const membresia=await Membresias.findOne({where:{UsuarioId:req.user.id,CongresoId:id}})
    
        if(membresia) return res.status(409).json({error:"Usuario ya en congreso"})
    
        const nuevoParticipante=await Membresias.create({
            UsuarioId:req.user.id,
            CongresoId:id
        })

        return res.status(200).json(nuevoParticipante)
    
    } catch (error) {
        console.error('Error al eliminar el congreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });       
    }


    


}

// Controlador para eliminar un congreso por ID
async function eliminarCongreso(req, res) {
    const { id } = req.params;
    console.log("eliminando",id)
    try {
        const congreso = await Congresos.findByPk(id);

        if (!congreso) return res.status(404).json({error:"Congreso no encontrado"})

        const membresia=await Membresias.findOne({where:{UsuarioId:req.user.id,CongresoId:id}})
        
        if(!membresia) return res.status(404).json({error:"No eres participante en el congreso"})

        if(!membresia.dueño) return res.status(403).json({error:"Solo los dueños de los congresos pueden elimnar sus congresos"})

        const CongresoEliminado= await congreso.destroy()

        console.log(CongresoEliminado,"elimnado")

        res.status(200).json({ mensaje: 'Congreso eliminado correctamente' });
        
        //  res.status(200)

    } catch (error) {
        console.error('Error al eliminar el congreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Exporta los controladores para ser utilizados en las rutas
export { invitacionCongreso,crearCongreso, obtenerCongresoPorId, editarCongreso, eliminarCongreso,obtenerCongresos };