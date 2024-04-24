import Autores from "../model/autor.mode.js";
async function obtenerAutorPorId(req, res) {
    const {articuloid:id} = req.params
    try {
        const autores = await Autores.findOne({where:{id}})
        res.status(200).json(autores); // Retorna todos los autores
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function crearAutor(req, res) {
    const { nombre, apellidos, contacto } = req.body;
    try {
        const nuevoAutor = await Autores.create(
            { nombre, apellidos, contacto }
        );
        res.status(201).json(nuevoAutor); // Retorna el autor creado
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function obtenerAutorPorArticuloId(req, res) {
    const { articuloid:id } = req.params;
    try {
        const autor = await Autores.findAll({where:{ArticuloId:id}});
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json(autor); // Retorna el autor encontrado
    } catch (error) {
        console.error('Error al obtener el autor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function actualizarAutor(req, res) {
    const { id } = req.params;
    const { nombre, apellidos, contacto } = req.body;
    try {
        const autor = await Autores.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        autor.nombre = nombre || autor.nombre;
        autor.apellidos = apellidos || autor.apellidos;
        autor.contacto = contacto || autor.contacto;
        await autor.save();
        res.status(200).json(autor); // Retorna el autor actualizado
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function eliminarAutor(req, res) {
    const { id } = req.params;
    try {
        const autor = await Autores.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        await autor.destroy();
        res.status(200).json({ mensaje: 'Autor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export { obtenerAutorPorId, crearAutor, obtenerAutorPorArticuloId, actualizarAutor, eliminarAutor };
