import Plato from "../models/Plato.js";

export const getPlatos = async (req, res) => {
  try {
    const platos = await Plato.find();
    res.json(platos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error inesperado.");
  }
};

export const getPlato = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);
    res.json(plato);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error inesperado.");
  }
};

export const addPlato = async (req, res) => {
  const { nombre, descripcion, precio, categoria, imagenes } = req.body;
  try {
    let plato = new Plato({ nombre, descripcion, precio, categoria, imagenes });
    plato = await plato.save();
    res.json(plato);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error inesperado.");
  }
};

export const updatePlato = async (req, res) => {
  const { nombre, precio, categoria } = req.body;
  const nuevoPlato = {};
  if (nombre) nuevoPlato.nombre = nombre;
  if (precio) nuevoPlato.precio = precio;
  if (categoria) nuevoPlato.categoria = categoria;
  try {
    let plato = await Plato.findById(req.params.id);
    if (!plato) {
      return res.status(404).json({ msg: "Plato no encontrado" });
    }
    plato = await Plato.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoPlato },
      { new: true }
    );
    res.json(plato);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error inesperado.");
  }
};

export const delPlato = async (req, res) => {
  try {
    let plato = await Plato.findById(req.params.id);
    if (!plato) {
      return res.status(404).json({ msg: "Plato no encontrado" });
    }
    await Plato.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: "Plato eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error inesperado.");
  }
};
