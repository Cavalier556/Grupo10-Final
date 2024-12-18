import Orden from "../models/Orden.js";

export const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    res.json(ordenes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

export const getOrden = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    res.json(orden);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

export const addOrden = async (req, res) => {
  const { mesa, nroDeOrden, platillos, cantidades } = req.body;
  const estado = "Activo";
  try {
    let orden = new Orden({ mesa, nroDeOrden, platillos, cantidades, estado });
    orden = await orden.save();
    res.json(orden);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

export const updateOrden = async (req, res) => {
  const { fecha, total, cliente, mesero, productos, estado } = req.body;
  const nuevaOrden = {};
  if (fecha) nuevaOrden.fecha = fecha;
  if (total) nuevaOrden.total = total;
  if (cliente) nuevaOrden.cliente = cliente;
  if (mesero) nuevaOrden.mesero = mesero;
  if (productos) nuevaOrden.productos = productos;
  if (estado) nuevaOrden.estado = estado;
  try {
    let orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ msg: "Orden no encontrada" });
    }
    orden = await Orden.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevaOrden },
      { new: true }
    );
    res.json(orden);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

export const delOrden = async (req, res) => {
  try {
    let orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ msg: "Orden no encontrada" });
    }
    await Orden.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: "Orden eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
