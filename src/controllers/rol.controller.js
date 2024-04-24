import Rol from '../model/rol.model.js';

// Obtener todos los roles
export const obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Crear un nuevo rol
export const crearRol = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevoRol = await Rol.create({ nombre });
    res.status(201).json(nuevoRol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// Obtener un rol por su ID
export const obtenerRolPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    res.status(200).json(rol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

// Actualizar un rol por su ID
export const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    rol.name = name;
    await rol.save();
    res.status(200).json(rol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Eliminar un rol por su ID
export const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    await rol.destroy();
    res.status(200).json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};